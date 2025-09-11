import fs from 'fs';
import path from 'path';

const readingsFile = 'public/data/readings.json';

// Function to clean and improve extracted text
function improveBookInfo(reading) {
  let { title, author, rawText } = reading;
  
  // Clean up common OCR artifacts
  const cleanText = (text) => {
    return text
      .replace(/[^\w\s\-.,:;!?'"()]/g, ' ') // Remove special characters except common punctuation
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  };
  
  // Known book patterns and corrections
  const bookCorrections = {
    'Hakomi Mindfulness-Centered': {
      title: 'Hakomi Mindfulness-Centered Somatic Psychotherapy',
      author: 'Ron Kurtz'
    },
    'How to': {
      title: 'How to Be an Adult in Relationships',
      author: 'David Richo'
    },
    'THE GUIDE TO NEW': {
      title: 'The Guide to New Body-Centered Therapies',
      author: 'Christine Caldwell'
    },
    'WAKING TIGER': {
      title: 'Waking the Tiger',
      author: 'Peter Levine'
    },
    'COMPLEX PTSD:': {
      title: 'Complex PTSD: From Surviving to Thriving',
      author: 'Pete Walker'
    },
    'FINDERS': {
      title: 'Finders Keepers',
      author: 'Martin'
    },
    'Healing 7108': {
      title: 'Healing Developmental Trauma',
      author: 'Laurence Heller & Aline LaPierre'
    },
    'NEW YORK TIMES BESTSELLER': {
      title: 'Homecoming: Reclaiming and Championing Your Inner Child',
      author: 'John Bradshaw'
    },
    'PSYCHOTHERAP': {
      title: 'Psychotherapy',
      author: 'Unknown'
    },
    'fill # |': {
      title: 'The Value of Relationships',
      author: 'Unknown'
    },
    'polysecure': {
      title: 'Polysecure: Attachment, Trauma and Consensual Nonmonogamy',
      author: 'Jessica Fern'
    },
    'BECOMING': {
      title: 'Becoming Embodied',
      author: 'Deirdre Fay'
    },
    'me RIGHT BRAIN': {
      title: 'The Right Brain and the Origin of Human Nature',
      author: 'Unknown'
    }
  };
  
  // Try to find a match in our corrections
  for (const [key, correction] of Object.entries(bookCorrections)) {
    if (title.includes(key) || rawText.includes(key)) {
      return {
        ...reading,
        title: correction.title,
        author: correction.author,
        cleaned: true
      };
    }
  }
  
  // If no specific correction, try to clean up the existing text
  const cleanedTitle = cleanText(title);
  const cleanedAuthor = cleanText(author);
  
  return {
    ...reading,
    title: cleanedTitle || 'Unknown Title',
    author: cleanedAuthor || 'Unknown Author',
    cleaned: false
  };
}

// Main function to improve readings
function improveReadings() {
  console.log('🔧 Improving readings data...');
  
  if (!fs.existsSync(readingsFile)) {
    console.error(`❌ Readings file not found: ${readingsFile}`);
    return;
  }
  
  const readings = JSON.parse(fs.readFileSync(readingsFile, 'utf8'));
  const improvedReadings = readings.map(improveBookInfo);
  
  // Write the improved readings.json file
  fs.writeFileSync(readingsFile, JSON.stringify(improvedReadings, null, 2));
  
  console.log(`\n🎉 Successfully improved ${improvedReadings.length} readings!`);
  console.log(`📄 Output: ${readingsFile}`);
  
  // Display summary
  improvedReadings.forEach((reading, index) => {
    const status = reading.cleaned ? '✅' : '⚠️';
    console.log(`  ${index + 1}. ${status} ${reading.title} - ${reading.author}`);
  });
}

// Run the improvement
improveReadings();
