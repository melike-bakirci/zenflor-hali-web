const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'app/data/karoHaliProducts.ts'),
  path.join(__dirname, 'app/data/cimHaliProducts.ts')
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove nameEn
    content = content.replace(/\s*nameEn:\s*".*?",/g, '');
    // Remove shortDescEn
    content = content.replace(/\s*shortDescEn:\s*".*?",/g, '');
    // Remove descriptionEn
    content = content.replace(/\s*descriptionEn:\s*".*?",/g, '');
    // Remove tagsEn
    content = content.replace(/\s*tagsEn:\s*\[.*?\],/g, '');
    // Remove featuresEn
    content = content.replace(/\s*featuresEn:\s*\[[\s\S]*?\],/g, '');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Processed ${file}`);
  }
}
