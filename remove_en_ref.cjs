const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app/data/referencesData.ts');

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove interface properties
  content = content.replace(/\s*industryEn:\s*string;/g, '');
  content = content.replace(/\s*titleEn:\s*string;/g, '');
  content = content.replace(/\s*categoryLabelEn:\s*string;/g, '');
  content = content.replace(/\s*productTypeEn:\s*string;/g, '');
  content = content.replace(/\s*descriptionEn:\s*string;/g, '');
  
  // Remove object properties
  content = content.replace(/\s*industryEn:\s*".*?",/g, '');
  content = content.replace(/\s*titleEn:\s*".*?",/g, '');
  content = content.replace(/\s*categoryLabelEn:\s*".*?",/g, '');
  content = content.replace(/\s*productTypeEn:\s*".*?",/g, '');
  content = content.replace(/\s*descriptionEn:\s*".*?",/g, '');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Processed ${file}`);
}
