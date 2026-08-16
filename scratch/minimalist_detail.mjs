import fs from 'fs';

// --- product-detail.css ---
let pd = fs.readFileSync('app/routes/product-detail.css', 'utf8');

pd = pd.replace(/box-shadow: var\(--shadow-card, 0 4px 14px rgba\(15, 23, 42, 0\.04\)\);/g, 'box-shadow: none;');
pd = pd.replace(/border: 1px solid var\(--color-border-card, rgba\(226, 232, 240, 0\.9\)\);/g, 'border: 1px solid rgba(0, 0, 0, 0.06);');
pd = pd.replace(/border-bottom: 2px solid var\(--color-primary, #66101f\);/g, 'border-bottom: 2px solid #111827;');
pd = pd.replace(/color: var\(--color-primary-light, #855a5c\);/g, 'color: #4b5563;');

pd = pd.replace(/background: linear-gradient\(135deg, #dc2626 0%, #991b1b 100%\);/g, 'background: #111827;');
pd = pd.replace(/box-shadow: 0 2px 8px rgba\(220, 38, 38, 0\.3\);/g, 'box-shadow: none;');

pd = pd.replace(/color: var\(--color-primary, #66101f\);/g, 'color: #111827;');
pd = pd.replace(/border-bottom-color: var\(--color-primary, #66101f\);/g, 'border-bottom-color: #111827;');

fs.writeFileSync('app/routes/product-detail.css', pd);

// --- ProductImageZoom.css ---
let iz = fs.readFileSync('app/components/ui/ProductImageZoom.css', 'utf8');

iz = iz.replace(/background: rgba\(17, 24, 39, 0\.65\);/g, 'background: rgba(255, 255, 255, 0.9);');
iz = iz.replace(/color: #ffffff;/g, 'color: #111827;');
iz = iz.replace(/border: 1px solid rgba\(255, 255, 255, 0\.2\);/g, 'border: 1px solid rgba(0, 0, 0, 0.1);');
iz = iz.replace(/box-shadow: 0 4px 12px rgba\(0, 0, 0, 0\.15\);/g, 'box-shadow: none;');

iz = iz.replace(/background: #66101f;/g, 'background: #f3f4f6;\n  color: #111827;');
iz = iz.replace(/border-color: #855a5c;/g, 'border-color: #d1d5db;');
iz = iz.replace(/box-shadow: 0 6px 16px rgba\(102, 16, 31, 0\.35\);/g, 'box-shadow: none;');

iz = iz.replace(/background: rgba\(255, 255, 255, 0\.1\);/g, 'background: rgba(255, 255, 255, 0.9);');
iz = iz.replace(/border: 1px solid rgba\(255, 255, 255, 0\.15\);/g, 'border: 1px solid rgba(0, 0, 0, 0.1);');

fs.writeFileSync('app/components/ui/ProductImageZoom.css', iz);

// --- AreaCalculator.css ---
let ac = fs.readFileSync('app/components/ui/AreaCalculator.css', 'utf8');

ac = ac.replace(/background: linear-gradient\(180deg, #f8fafc 0%, #ffffff 100%\);/g, 'background: #ffffff;');
ac = ac.replace(/border: 1px solid var\(--color-border-card, #e2e8f0\);/g, 'border: 1px solid rgba(0, 0, 0, 0.06);');
ac = ac.replace(/box-shadow: 0 2px 10px rgba\(15, 23, 42, 0\.03\);/g, 'box-shadow: none;');

ac = ac.replace(/border-color: rgba\(102, 16, 31, 0\.25\);/g, 'border-color: rgba(0, 0, 0, 0.12);');
ac = ac.replace(/box-shadow: 0 4px 16px rgba\(102, 16, 31, 0\.06\);/g, 'box-shadow: none;');

ac = ac.replace(/color: var\(--color-primary, #66101f\);/g, 'color: #111827;');
ac = ac.replace(/border-color: var\(--color-primary, #66101f\);/g, 'border-color: #111827;');

ac = ac.replace(/box-shadow: 0 0 0 4px rgba\(102, 16, 31, 0\.1\), inset 0 2px 4px rgba\(15, 23, 42, 0\.01\);/g, 'box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.03);');

ac = ac.replace(/color: var\(--color-primary, #66101f\) !important;/g, 'color: #111827 !important;');
ac = ac.replace(/background: rgba\(102, 16, 31, 0\.05\);/g, 'background: #f3f4f6;');

ac = ac.replace(/box-shadow: 0 4px 12px rgba\(102, 16, 31, 0\.1\);/g, 'box-shadow: none;');
ac = ac.replace(/box-shadow: 0 1px 3px rgba\(0, 0, 0, 0\.03\);/g, 'box-shadow: none;');

fs.writeFileSync('app/components/ui/AreaCalculator.css', ac);

console.log('done');
