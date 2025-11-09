import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const frRoot = path.join(projectRoot, 'portfolio', 'fr');
const enRoot = path.join(projectRoot, 'portfolio', 'en');

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const dryRun = process.argv.includes('--dry-run');
const processAll = process.argv.includes('--all');
const onlyChanged = !processAll;

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ Missing GEMINI_API_KEY environment variable.');
  process.exit(1);
}

const dirMappings = {
  'Intérêts': 'Interests',
  'Intérêts/': 'Interests/',
  'Lectures': 'Lectures',
  'À propos': 'About',
  'Expérience': 'Experience',
  'Formations': 'Formations',
  'Fun': 'Fun',
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
let generativeModel;

try {
  generativeModel = genAI.getGenerativeModel({ model: GEMINI_MODEL });
} catch (error) {
  console.error('❌ Failed to create Gemini model:', error?.message || error);
  process.exit(1);
}

function mapFrenchSegmentToEnglish(segment) {
  if (dirMappings[segment]) return dirMappings[segment];
  return segment;
}

function unescapeGitPath(input) {
  let str = input;
  if (str.startsWith('"') && str.endsWith('"')) {
    str = str.slice(1, -1);
  }

  const bytes = [];
  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];
    if (char === '\\') {
      const next = str[i + 1];
      if (next && /[0-7]/.test(next)) {
        const octal = str.slice(i + 1, i + 4);
        bytes.push(parseInt(octal, 8));
        i += 3;
        continue;
      }
      if (next === '\\' || next === '"' || next === ' ') {
        bytes.push(next.charCodeAt(0));
        i += 1;
        continue;
      }
    }
    bytes.push(char.charCodeAt(0));
  }

  return Buffer.from(bytes).toString('utf8');
}

function mapFrenchPathToEnglish(filePath) {
  const relative = path.relative(frRoot, filePath);
  if (relative.startsWith('..')) {
    throw new Error(`Path ${filePath} is not inside ${frRoot}`);
  }
  const segments = relative.split(path.sep).map(mapFrenchSegmentToEnglish);
  return path.join(enRoot, ...segments);
}

function parseMarkdown(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    return { frontMatter: {}, body: content.trim() };
  }
  const frontMatter = yaml.load(match[1]) || {};
  const body = match[2] ?? '';
  return { frontMatter, body };
}

function stringifyMarkdown(frontMatter, body) {
  const frontMatterString =
    Object.keys(frontMatter).length > 0
      ? `---\n${yaml.dump(frontMatter, { lineWidth: -1 })}---\n\n`
      : '';
  return `${frontMatterString}${body.trim()}\n`;
}

async function getChangedFrenchFiles() {
  try {
    const output = execSync('git status --porcelain', {
      cwd: projectRoot,
      encoding: 'utf8',
    });
    const files = new Set();
    output
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .forEach(line => {
        if (line.length < 4) return;
        const pathPart = line.substring(3).trim();
        let finalPath = pathPart.includes(' -> ')
          ? pathPart.split(' -> ').pop()
          : pathPart;

        finalPath = unescapeGitPath(finalPath);

        if (!finalPath) return;
        const normalized = finalPath.replace(/\\/g, '/');
        if (!normalized.toLowerCase().endsWith('.md')) return;
        if (!normalized.startsWith('portfolio/fr/')) return;
        files.add(path.join(projectRoot, normalized));
      });

    const existing = [];
    for (const filePath of files) {
      try {
        await fs.access(filePath);
        existing.push(filePath);
      } catch {
        // ignore removed paths
      }
    }

    return existing;
  } catch (error) {
    console.error('❌ Unable to read git status for changed files:', error);
    process.exit(1);
  }
}

async function getAllFrenchMarkdownFiles() {
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const results = await Promise.all(
      entries.map(async entry => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          return walk(fullPath);
        }
        if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
          return [fullPath];
        }
        return [];
      })
    );
    return results.flat();
  }

  return walk(frRoot);
}

async function translateContent(subtitle, body) {
  const instruction =
    "You translate French markdown cards into English. Return a strict JSON object with two string fields: subtitle and body. Subtitle must contain the subtitle translated into English. Body must contain the markdown content translated into English, preserving markdown structure, formatting, headings, emphasis, links and lists. Do not include code fences, markdown metadata or additional commentary. Ensure the JSON is valid and uses double quotes.";

  const userText = [
    'Subtitle:',
    subtitle || '',
    '',
    'Markdown content:',
    body || '',
  ].join('\n');

  const result = await generativeModel.generateContent([
    { text: instruction },
    { text: userText },
  ]);

  const responseText = result.response?.text?.();
  if (!responseText) {
    throw new Error('Empty response from Gemini');
  }

  const cleaned = responseText
    .trim()
    .replace(/```(?:json)?\s*/g, '')
    .replace(/```$/, '');

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    throw new Error(`Failed to parse JSON response: ${cleaned}`);
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error(`Unexpected response format: ${cleaned}`);
  }

  return {
    subtitle: typeof parsed.subtitle === 'string' ? parsed.subtitle.trim() : '',
    body: typeof parsed.body === 'string' ? parsed.body.trim() : '',
  };
}

async function processFile(frenchPath) {
  console.log(`\n🌐 Translating: ${frenchPath}`);

  const englishPath = mapFrenchPathToEnglish(frenchPath);

  const frenchContent = await fs.readFile(frenchPath, 'utf8');
  const { frontMatter: frFrontMatter, body: frBody } = parseMarkdown(frenchContent);

  let englishFrontMatter;
  try {
    const existingContent = await fs.readFile(englishPath, 'utf8');
    const { frontMatter } = parseMarkdown(existingContent);
    englishFrontMatter = { ...frontMatter };
  } catch {
    englishFrontMatter = { ...frFrontMatter };
  }

  if (!frBody.trim()) {
    console.log('  ⚠️  Skipped (empty body).');
    return;
  }

  const { subtitle, body } = await translateContent(frFrontMatter?.subtitle, frBody);

  if (!body.trim() && !subtitle.trim()) {
    console.log('  ⚠️  Translation appears empty, file left unchanged.');
    return;
  }

  if (subtitle) {
    englishFrontMatter.subtitle = subtitle;
  }

  const finalContent = stringifyMarkdown(englishFrontMatter, body);

  if (dryRun) {
    console.log(`  🔍 Translation ready (dry-run, no file write). Target: ${englishPath}`);
    return;
  }

  await fs.mkdir(path.dirname(englishPath), { recursive: true });
  await fs.writeFile(englishPath, finalContent, 'utf8');
  console.log(`  ✅ Updated English card: ${englishPath}`);
}

async function main() {
  try {
    const files = processAll
      ? await getAllFrenchMarkdownFiles()
      : await getChangedFrenchFiles();

    if (files.length === 0) {
      if (onlyChanged) {
        console.log('Aucun fichier Markdown français modifié trouvé.');
      } else {
        console.log('Aucun fichier Markdown français trouvé.');
      }
      return;
    }

    console.log(
      `🔄 Translating ${files.length} French markdown file(s) ${
        onlyChanged ? '(changed files only)' : '(all files)'
      }.`
    );

    for (const filePath of files) {
      try {
        await processFile(filePath);
      } catch (error) {
        console.error(`  ❌ Error translating ${filePath}:`, error.message || error);
      }
    }

    console.log('\n✅ Translation run complete.');
  } catch (error) {
    console.error('❌ Translation script failed:', error);
    process.exit(1);
  }
}

main();

