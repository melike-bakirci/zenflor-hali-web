import fs from 'fs';

let css = fs.readFileSync('app/routes/about.css', 'utf8');

// Container borders & shadows
css = css.replace(/border: 1px solid var\(--color-border-card, rgba\(226, 232, 240, 0\.9\)\);/g, 'border: 1px solid rgba(0, 0, 0, 0.06);');
css = css.replace(/box-shadow: var\(--shadow-card, 0 2px 8px rgba\(15, 23, 42, 0\.04\)\);/g, 'box-shadow: none;');
css = css.replace(/box-shadow: var\(--shadow-card, 0 4px 14px rgba\(15, 23, 42, 0\.04\)\);/g, 'box-shadow: none;');
css = css.replace(/box-shadow: 0 2px 6px rgba\(15, 23, 42, 0\.03\);/g, 'box-shadow: none;');

// Hover shadows and borders
css = css.replace(/border-color: rgba\(102, 16, 31, 0\.25\);/g, 'border-color: rgba(0, 0, 0, 0.12);');
css = css.replace(/border-color: var\(--color-border-hover, rgba\(102, 16, 31, 0\.35\)\);/g, 'border-color: rgba(0, 0, 0, 0.12);');
css = css.replace(/box-shadow: 0 8px 20px rgba\(102, 16, 31, 0\.08\);/g, 'box-shadow: none;');
css = css.replace(/box-shadow: 0 10px 25px -5px rgba\(102, 16, 31, 0\.08\);/g, 'box-shadow: none;');
css = css.replace(/box-shadow: var\(--shadow-card-hover, 0 12px 28px rgba\(102, 16, 31, 0\.12\)\);/g, 'box-shadow: none;');

// Text colors
css = css.replace(/color: var\(--color-primary, #66101f\);/g, 'color: #111827;');
css = css.replace(/color: var\(--color-primary-light, #855a5c\);/g, 'color: #4b5563;');

// Gradients & Accents
css = css.replace(/background: linear-gradient\(135deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%\);/g, 'background: #ffffff;');
css = css.replace(/background: rgba\(102, 16, 31, 0\.03\);/g, 'background: #f9fafb;');
css = css.replace(/border-color: rgba\(102, 16, 31, 0\.15\);/g, 'border-color: rgba(0, 0, 0, 0.06);');

// Icon links
css = css.replace(/border: 1\.5px solid rgba\(102, 16, 31, 0\.2\);/g, 'border: 1.5px solid rgba(0, 0, 0, 0.1);');
css = css.replace(/box-shadow: 0 2px 8px rgba\(102, 16, 31, 0\.06\);/g, 'box-shadow: none;');
css = css.replace(/background-color: var\(--color-primary, #66101f\);/g, 'background-color: #f3f4f6;\n  color: #111827;');
css = css.replace(/border-color: var\(--color-primary, #66101f\);/g, 'border-color: #d1d5db;');
css = css.replace(/box-shadow: var\(--shadow-primary, 0 8px 24px rgba\(102, 16, 31, 0\.3\)\);/g, 'box-shadow: none;');

// Background blocks
css = css.replace(/background: rgba\(102, 16, 31, 0\.08\);/g, 'background: #f3f4f6;');
css = css.replace(/background: var\(--color-primary, #66101f\);/g, 'background: #111827;\n  color: #ffffff;');
css = css.replace(/background: rgba\(133, 90, 92, 0\.12\);/g, 'background: #f3f4f6;');
css = css.replace(/background: var\(--color-primary-light, #855a5c\);/g, 'background: #111827;');

fs.writeFileSync('app/routes/about.css', css);
console.log('done');
