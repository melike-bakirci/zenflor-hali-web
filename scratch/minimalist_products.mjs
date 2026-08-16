import fs from 'fs';

// --- ProductCard.css ---
let pc = fs.readFileSync('app/components/ui/ProductCard.css', 'utf8');

// Container
pc = pc.replace(/border: 1px solid rgba\(255, 255, 255, 0\.9\);/g, 'border: 1px solid rgba(0, 0, 0, 0.06);');
pc = pc.replace(/box-shadow: var\(--shadow-card, 0 4px 16px rgba\(15, 23, 42, 0\.06\)\);/g, 'box-shadow: none;');

// ::before gradient
pc = pc.replace(/\.product-card::before \{[\s\S]*?\}/, '.product-card::before {\n  display: none;\n}');
pc = pc.replace(/\.product-card:hover::before \{[\s\S]*?\}/, '');

// Hover effect
pc = pc.replace(/transform: translateY\(-6px\);/g, 'transform: translateY(-2px);\n  border-color: rgba(0, 0, 0, 0.12);');
pc = pc.replace(/box-shadow: var\(--shadow-card-hover, 0 24px 48px rgba\(15, 23, 42, 0\.1\)\);/g, 'box-shadow: none;');

// Badges
pc = pc.replace(/background: linear-gradient\(135deg, #dc2626 0%, #991b1b 100%\);/g, 'background: #111827;');
pc = pc.replace(/box-shadow: 0 4px 10px rgba\(220, 38, 38, 0\.35\);/g, 'box-shadow: none;');
pc = pc.replace(/background: var\(--color-primary, #66101f\);/g, 'background: #111827;');
pc = pc.replace(/box-shadow: 0 2px 6px rgba\(0, 0, 0, 0\.2\);/g, 'box-shadow: none;');

// Link colors
pc = pc.replace(/color: var\(--color-primary, #66101f\);/g, 'color: #111827;');
pc = pc.replace(/color: var\(--color-primary-hover, #855a5c\);/g, 'color: #4b5563;');

fs.writeFileSync('app/components/ui/ProductCard.css', pc);


// --- ProductFilterBar.css ---
let fb = fs.readFileSync('app/components/ui/ProductFilterBar.css', 'utf8');

fb = fb.replace(/border: 1px solid var\(--color-border-card, rgba\(226, 232, 240, 0\.9\)\);/g, 'border: 1px solid rgba(0, 0, 0, 0.06);');
fb = fb.replace(/box-shadow: var\(--shadow-card, 0 4px 14px rgba\(15, 23, 42, 0\.04\)\);/g, 'box-shadow: none;');

fb = fb.replace(/border-color: var\(--color-primary, #66101f\);/g, 'border-color: #111827;');
fb = fb.replace(/box-shadow: 0 0 0 4px rgba\(102, 16, 31, 0\.1\), inset 0 2px 4px rgba\(15, 23, 42, 0\.01\);/g, 'box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.03);');
fb = fb.replace(/color: #66101f;/g, 'color: #111827;');

fb = fb.replace(/background-color: #66101f;/g, 'background-color: #111827;');
fb = fb.replace(/border: 1px solid #66101f;/g, 'border: 1px solid #111827;');

fb = fb.replace(/background-color: #500c18;/g, 'background-color: #f3f4f6;\n  color: #111827;');
fb = fb.replace(/border-color: #500c18;/g, 'border-color: #d1d5db;');
fb = fb.replace(/box-shadow: 0 4px 12px rgba\(102, 16, 31, 0\.25\);/g, 'box-shadow: none;');

fb = fb.replace(/border-color: #66101f;/g, 'border-color: #111827;');
fb = fb.replace(/box-shadow: 0 0 0 3px rgba\(102, 16, 31, 0\.12\);/g, 'box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.03);');

fs.writeFileSync('app/components/ui/ProductFilterBar.css', fb);


// --- ProductSidebarFilter.css ---
let sf = fs.readFileSync('app/components/ui/ProductSidebarFilter.css', 'utf8');

sf = sf.replace(/border: 1px solid var\(--color-border-card, rgba\(226, 232, 240, 0\.9\)\);/g, 'border: 1px solid rgba(0, 0, 0, 0.06);');
sf = sf.replace(/box-shadow: var\(--shadow-card, 0 4px 14px rgba\(15, 23, 42, 0\.04\)\);/g, 'box-shadow: none;');
sf = sf.replace(/color: #66101f;/g, 'color: #111827;');
sf = sf.replace(/color: #855a5c;/g, 'color: #4b5563;');
sf = sf.replace(/background: #f9fafb;/g, 'background: #f3f4f6;');
sf = sf.replace(/background-color: #66101f;/g, 'background-color: #111827;');
sf = sf.replace(/border-color: #66101f;/g, 'border-color: #111827;');

sf = sf.replace(/background: #66101f;/g, 'background: #111827;');
sf = sf.replace(/box-shadow: 0 4px 12px rgba\(102, 16, 31, 0\.18\);/g, 'box-shadow: none;');
sf = sf.replace(/background: #500c18;/g, 'background: #374151;');

fs.writeFileSync('app/components/ui/ProductSidebarFilter.css', sf);

console.log('done');
