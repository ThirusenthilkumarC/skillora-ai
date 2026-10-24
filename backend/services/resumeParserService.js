const pdfParse = require('pdf-parse');

// Comprehensive dictionary of technical and soft skills for robust pattern matching
const SKILL_DATABASE = [
  // Frontend
  { name: 'JavaScript', category: 'Frontend', synonyms: ['js', 'ecmascript', 'es6', 'es2020'] },
  { name: 'TypeScript', category: 'Frontend', synonyms: ['ts'] },
  { name: 'React.js', category: 'Frontend', synonyms: ['react', 'reactjs', 'react native'] },
  { name: 'Next.js', category: 'Frontend', synonyms: ['nextjs', 'next'] },
  { name: 'Vue.js', category: 'Frontend', synonyms: ['vue', 'vuejs', 'vue3'] },
  { name: 'Angular', category: 'Frontend', synonyms: ['angularjs', 'angular 2+'] },
  { name: 'HTML5', category: 'Frontend', synonyms: ['html', 'semantic html'] },
  { name: 'CSS3', category: 'Frontend', synonyms: ['css', 'flexbox', 'grid', 'sass', 'scss', 'less'] },
  { name: 'Tailwind CSS', category: 'Frontend', synonyms: ['tailwind', 'tailwindcss'] },
  { name: 'Bootstrap', category: 'Frontend', synonyms: ['bootstrap 5'] },
  { name: 'Redux', category: 'Frontend', synonyms: ['redux toolkit', 'rtk'] },
  
  // Backend & Languages
  { name: 'Node.js', category: 'Backend', synonyms: ['node', 'nodejs'] },
  { name: 'Express.js', category: 'Backend', synonyms: ['express', 'expressjs'] },
  { name: 'Python', category: 'Backend', synonyms: ['python 3', 'python3', 'py'] },
  { name: 'Django', category: 'Backend', synonyms: ['django rest framework', 'drf'] },
  { name: 'FastAPI', category: 'Backend', synonyms: ['fastapi'] },
  { name: 'Flask', category: 'Backend', synonyms: ['flask'] },
  { name: 'Java', category: 'Backend', synonyms: ['core java', 'j2ee'] },
  { name: 'Spring Boot', category: 'Backend', synonyms: ['springboot', 'spring'] },
  { name: 'C++', category: 'Backend', synonyms: ['cpp', 'c/c++'] },
  { name: 'C#', category: 'Backend', synonyms: ['csharp', '.net', 'dotnet', 'asp.net'] },
  { name: 'Go', category: 'Backend', synonyms: ['golang'] },
  { name: 'Rust', category: 'Backend', synonyms: ['rustlang'] },
  { name: 'PHP', category: 'Backend', synonyms: ['laravel', 'symfony'] },
  { name: 'GraphQL', category: 'Backend', synonyms: ['apollo', 'graphql api'] },
  { name: 'REST APIs', category: 'Backend', synonyms: ['rest', 'restful', 'api design'] },

  // Databases
  { name: 'MongoDB', category: 'Database', synonyms: ['mongo', 'nosql', 'mongoose'] },
  { name: 'PostgreSQL', category: 'Database', synonyms: ['postgres', 'psql'] },
  { name: 'MySQL', category: 'Database', synonyms: ['mysql server', 'mariadb'] },
  { name: 'SQLite', category: 'Database', synonyms: ['sqlite3'] },
  { name: 'Redis', category: 'Database', synonyms: ['redis cache'] },
  { name: 'Firebase', category: 'Database', synonyms: ['firestore', 'firebase auth'] },
  { name: 'SQL', category: 'Database', synonyms: ['sql queries', 'relational databases'] },

  // AI & Data
  { name: 'Pandas', category: 'AI & Data', synonyms: ['pandas dataframe'] },
  { name: 'NumPy', category: 'AI & Data', synonyms: ['numpy'] },
  { name: 'Scikit-Learn', category: 'AI & Data', synonyms: ['sklearn', 'scikit learn'] },
  { name: 'TensorFlow', category: 'AI & Data', synonyms: ['tf', 'keras'] },
  { name: 'PyTorch', category: 'AI & Data', synonyms: ['pytorch', 'torch'] },
  { name: 'Machine Learning', category: 'AI & Data', synonyms: ['ml', 'data science', 'deep learning'] },
  { name: 'PowerBI', category: 'AI & Data', synonyms: ['power bi', 'power-bi'] },
  { name: 'Tableau', category: 'AI & Data', synonyms: ['tableau desktop'] },

  // DevOps & Cloud
  { name: 'Docker', category: 'DevOps & Cloud', synonyms: ['dockerfile', 'containers', 'containerization'] },
  { name: 'Kubernetes', category: 'DevOps & Cloud', synonyms: ['k8s'] },
  { name: 'AWS', category: 'DevOps & Cloud', synonyms: ['amazon web services', 'ec2', 's3', 'lambda'] },
  { name: 'Azure', category: 'DevOps & Cloud', synonyms: ['microsoft azure'] },
  { name: 'Google Cloud (GCP)', category: 'DevOps & Cloud', synonyms: ['gcp', 'google cloud'] },
  { name: 'CI/CD', category: 'DevOps & Cloud', synonyms: ['github actions', 'jenkins', 'gitlab ci'] },
  { name: 'Linux', category: 'DevOps & Cloud', synonyms: ['ubuntu', 'bash', 'shell script', 'unix'] },

  // Tools & UI/UX
  { name: 'Git & GitHub', category: 'Tools & Version Control', synonyms: ['git', 'github', 'gitlab', 'version control'] },
  { name: 'Figma', category: 'Design', synonyms: ['figma components', 'figma prototypes'] },
  { name: 'UI/UX Design', category: 'Design', synonyms: ['wireframing', 'user research', 'prototyping'] },
  { name: 'Postman', category: 'Tools & Version Control', synonyms: ['postman api', 'api testing'] },
  { name: 'Jest / Vitest', category: 'Tools & Version Control', synonyms: ['jest', 'vitest', 'unit testing'] },

  // Cybersecurity
  { name: 'Cybersecurity', category: 'Cybersecurity', synonyms: ['infosec', 'penetration testing', 'soc', 'siem'] },
  { name: 'OWASP Security', category: 'Cybersecurity', synonyms: ['owasp', 'web application security', 'vulnerability assessment'] },
  { name: 'Wireshark & Nmap', category: 'Cybersecurity', synonyms: ['wireshark', 'nmap', 'network security'] }
];

/**
 * Extract readable text from raw PDF streams as a fallback when pdfjs fails on modern xrefs.
 */
const extractFallbackStreamText = (buffer) => {
  try {
    const raw = buffer.toString('latin1');
    const chunks = [];
    
    // Pattern 1: (text) Tj
    const tjMatches = raw.matchAll(/\(([^)]+)\)\s*Tj/g);
    for (const m of tjMatches) {
      if (m[1]) chunks.push(m[1]);
    }

    // Pattern 2: [(part1) 120 (part2)] TJ
    const arrayMatches = raw.matchAll(/\[(.*?)\]\s*TJ/g);
    for (const m of arrayMatches) {
      const innerT = m[1].matchAll(/\(([^)]+)\)/g);
      for (const it of innerT) {
        if (it[1]) chunks.push(it[1]);
      }
    }

    // Pattern 3: Clean text lines within streams
    const streamMatches = raw.matchAll(/stream([\s\S]*?)endstream/g);
    for (const sm of streamMatches) {
      const streamText = sm[1];
      const words = streamText.match(/[a-zA-Z0-9_\-\.\+\#]{3,}/g);
      if (words && words.length > 5) {
        chunks.push(words.join(' '));
      }
    }

    return chunks.join(' ').trim();
  } catch (err) {
    return '';
  }
};

/**
 * Parse PDF buffer and extract recognized technical & professional skills.
 */
const parseResumeBuffer = async (buffer) => {
  if (!buffer || buffer.length === 0) {
    throw new Error('Empty PDF file provided');
  }

  let cleanText = '';
  
  // Strategy 1: Standard pdf-parse extraction
  try {
    const parsed = await pdfParse(buffer);
    cleanText = (parsed.text || '').trim();
  } catch (pdfErr) {
    // Strategy 2: Fallback direct stream extraction for newer PDF structures
    cleanText = extractFallbackStreamText(buffer);
  }

  // If still too short, check fallback stream once more
  if (cleanText.length < 50) {
    const fallbackText = extractFallbackStreamText(buffer);
    if (fallbackText.length > cleanText.length) {
      cleanText = fallbackText;
    }
  }

  // If text is still empty, document is an image-only scanned document
  if (cleanText.length < 20) {
    return {
      success: false,
      isScannedImage: true,
      message: 'No extractable text was found in this PDF. It appears to be a scanned image or flattened document without an embedded text layer.',
      guidance: 'Skillora AI does not execute server-heavy OCR on free-tier servers. Please upload a standard text PDF (exported from Google Docs, MS Word, or Canva) or add your skills directly via the form.',
      extractedSkills: [],
      wordCount: 0
    };
  }

  const lowerText = cleanText.toLowerCase();
  const detectedSkills = [];
  const foundNames = new Set();

  for (const skillItem of SKILL_DATABASE) {
    // Check primary name
    let matched = false;
    const primaryPattern = new RegExp(`\\b${escapeRegExp(skillItem.name.toLowerCase())}\\b`, 'i');
    if (primaryPattern.test(lowerText)) {
      matched = true;
    } else if (skillItem.synonyms) {
      for (const syn of skillItem.synonyms) {
        const synPattern = new RegExp(`\\b${escapeRegExp(syn.toLowerCase())}\\b`, 'i');
        if (synPattern.test(lowerText)) {
          matched = true;
          break;
        }
      }
    }

    if (matched && !foundNames.has(skillItem.name)) {
      foundNames.add(skillItem.name);

      // Estimate initial proficiency heuristic based on frequency or keywords
      const occurrences = (lowerText.match(new RegExp(escapeRegExp(skillItem.name.toLowerCase()), 'g')) || []).length;
      let proficiency = 'Intermediate';
      if (occurrences >= 3 || lowerText.includes(`senior ${skillItem.name.toLowerCase()}`) || lowerText.includes(`advanced ${skillItem.name.toLowerCase()}`)) {
        proficiency = 'Advanced';
      } else if (occurrences === 1 && (lowerText.includes('familiar with') || lowerText.includes('basic'))) {
        proficiency = 'Beginner';
      }

      detectedSkills.push({
        name: skillItem.name,
        category: skillItem.category,
        proficiency
      });
    }
  }

  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;

  return {
    success: true,
    isScannedImage: false,
    extractedSkills: detectedSkills,
    skillsCount: detectedSkills.length,
    wordCount,
    previewSnippet: cleanText.slice(0, 300) + '...'
  };
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
  parseResumeBuffer,
  SKILL_DATABASE
};
