import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const targetDirectory = path.join(projectRoot, 'portfolio', 'fr');
const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const dryRun = process.argv.includes('--dry-run');
const onlyChanged = process.argv.includes('--changed');

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ Missing GEMINI_API_KEY environment variable.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
let generativeModel;

try {
  generativeModel = genAI.getGenerativeModel({ model });
} catch (error) {
  console.error('❌ Impossible de créer le modèle Gemini :', error?.message || error);
  console.error(
    'Vérifiez que la variable GEMINI_MODEL correspond à un modèle valide (ex. "gemini-1.5-flash").'
  );
  process.exit(1);
}

async function getMarkdownFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async entry => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return getMarkdownFiles(fullPath);
      }
      if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
        return [fullPath];
      }
      return [];
    })
  );

  return files.flat();
}

async function getChangedMarkdownFiles() {
  try {
    const output = execSync('git status --porcelain', {
      cwd: projectRoot,
      encoding: 'utf8'
    });

    const lines = output
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const files = new Set();

    for (const line of lines) {
      if (line.length < 4) continue;
      const pathPart = line.substring(3).trim();
      const candidate = pathPart.includes(' -> ')
        ? pathPart.split(' -> ').pop()
        : pathPart;
      if (!candidate) continue;
      const normalized = candidate.replace(/\\/g, '/');
      if (!normalized.toLowerCase().endsWith('.md')) continue;
      if (!normalized.startsWith('portfolio/fr/')) continue;
      files.add(path.join(projectRoot, normalized));
    }

    const existingFiles = [];
    for (const filePath of files) {
      try {
        await fs.access(filePath);
        existingFiles.push(filePath);
      } catch {
        // ignore removed files
      }
    }

    return existingFiles;
  } catch (error) {
    console.error('❌ Impossible de récupérer la liste des fichiers modifiés :', error);
    console.error('Assurez-vous que ce script est exécuté dans un dépôt git.');
    process.exit(1);
  }
}

async function spellcheckFile(filePath) {
  console.log(`\n📝 Processing: ${filePath}`);
  const originalContent = await fs.readFile(filePath, 'utf8');

  if (!originalContent.trim()) {
    console.log('  ⚠️  Skipped (empty file).');
    return;
  }

  const instruction =
    "Tu es un assistant qui relit un texte en français et corrige uniquement les fautes d'orthographe ou de frappe. Ne change pas la formulation, la structure ou la ponctuation sauf si c'est pour corriger une faute évidente. Réponds uniquement avec le texte corrigé au format Markdown, sans entourer ta réponse de blocs de code ni de balises ```.";

  const result = await generativeModel.generateContent([
    { text: instruction },
    { text: '\n\nTexte à corriger:\n' + originalContent }
  ]);

  const correctedContent = result.response
    ?.text()
    ?.trim();

  if (!correctedContent) {
    console.log('  ⚠️  Aucun contenu retourné, fichier laissé inchangé.');
    return;
  }

  if (correctedContent === originalContent.trim()) {
    console.log('  ✅ Aucun changement détecté.');
    return;
  }

  if (dryRun) {
    console.log('  🔍 Changements détectés (dry-run, fichier non modifié).');
    return;
  }

  await fs.writeFile(filePath, correctedContent, 'utf8');
  console.log('  ✏️  Fichier mis à jour.');
}

async function main() {
  try {
    const markdownFiles = onlyChanged
      ? await getChangedMarkdownFiles()
      : await getMarkdownFiles(targetDirectory);

    if (markdownFiles.length === 0) {
      if (onlyChanged) {
        console.log('Aucun fichier Markdown modifié trouvé dans portfolio/fr.');
      } else {
        console.log('Aucun fichier Markdown trouvé dans portfolio/fr.');
      }
      return;
    }

    const scopeLabel = onlyChanged ? 'modifié(s)' : 'Markdown trouvé(s)';
    console.log(`🔍 ${markdownFiles.length} fichier(s) ${scopeLabel}.`);

    for (const filePath of markdownFiles) {
      await spellcheckFile(filePath);
    }

    console.log('\n✅ Relecture terminée.');
  } catch (error) {
    console.error('❌ Erreur lors de la relecture :', error);
    process.exit(1);
  }
}

main();

