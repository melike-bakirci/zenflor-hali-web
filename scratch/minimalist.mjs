import fs from 'fs';

let css = fs.readFileSync('app/routes/blog-detail.css', 'utf8');

// General shadows and borders
css = css.replace(/box-shadow: 0 4px 20px rgba\(15, 23, 42, 0\.04\);/g, 'box-shadow: none;');
css = css.replace(/border: 1px solid #e9edf3;/g, 'border: 1px solid rgba(0, 0, 0, 0.06);');
css = css.replace(/box-shadow: 0 2px 10px rgba\(15, 23, 42, 0\.04\);/g, 'box-shadow: none;');
css = css.replace(/border: 1px solid #e8edf5;/g, 'border: 1px solid rgba(0, 0, 0, 0.06);');
css = css.replace(/box-shadow: 0 4px 18px rgba\(15, 23, 42, 0\.08\);/g, 'box-shadow: none;');
css = css.replace(/border: 1px solid #eaeff6;/g, 'border: 1px solid rgba(0, 0, 0, 0.06);');
css = css.replace(/box-shadow: 0 2px 12px rgba\(15, 23, 42, 0\.04\);/g, 'box-shadow: none;');
css = css.replace(/box-shadow: 0 2px 8px rgba\(102, 16, 31, 0\.22\);/g, 'box-shadow: none;');
css = css.replace(/box-shadow: 0 4px 16px rgba\(15, 23, 42, 0\.06\);/g, 'box-shadow: none;');

// Reading bar buttons
css = css.replace(/background: rgba\(102, 16, 31, 0\.08\);/g, 'background: #f3f4f6;');
css = css.replace(/color: var\(--color-primary, #66101f\);/g, 'color: #111827;');
css = css.replace(/background: rgba\(102, 16, 31, 0\.12\);/g, 'background: #111827;');
css = css.replace(/\.blog-reading-bar__btn\.active \{\n  background: #111827;\n  color: #111827;/g, '.blog-reading-bar__btn.active {\n  background: #111827;\n  color: #ffffff;');
css = css.replace(/background: rgba\(239, 68, 68, 0\.1\) !important;/g, 'background: #f3f4f6 !important;');
css = css.replace(/color: #ef4444 !important;/g, 'color: #111827 !important;');

// Typography & Content
css = css.replace(/background: var\(--color-primary, #66101f\);/g, 'background: #111827;');
css = css.replace(/border-left: 4px solid var\(--color-primary, #66101f\);/g, 'border-left: 4px solid #111827;');
css = css.replace(/color: var\(--color-primary, #66101f\);/g, 'color: #111827;');
css = css.replace(/background: rgba\(102, 16, 31, 0\.035\);/g, 'background: #f9fafb;');
css = css.replace(/background: linear-gradient\(135deg, #66101f, #855a5c\);/g, 'background: #111827;');
css = css.replace(/background: linear-gradient\(135deg, #66101f, #8b1a30\);/g, 'background: #111827;');
css = css.replace(/background: rgba\(102, 16, 31, 0\.04\);/g, 'background: #f3f4f6;');

// Tags
css = css.replace(/\.blog-detail__tag:hover \{\n  background: #111827;\n  color: #ffffff;\n  border-color: #111827;/g, '.blog-detail__tag:hover {\n  background: #e5e7eb;\n  color: #111827;\n  border-color: #d1d5db;');

// Share Strip
css = css.replace(/background: linear-gradient\(135deg, #fdf8f8, #f8fafc\);/g, 'background: #ffffff;');
css = css.replace(/border: 1px solid #f0e6e8;/g, 'border: 1px solid rgba(0, 0, 0, 0.06);');

// Icon Buttons
css = css.replace(/\.sb-icon-btn:hover \{\n  background-color: #111827;\n  border-color: #111827;\n  color: #ffffff;/g, '.sb-icon-btn:hover {\n  background-color: #f3f4f6;\n  border-color: #d1d5db;\n  color: #111827;');
css = css.replace(/box-shadow: 0 4px 10px rgba\(102, 16, 31, 0\.25\);/g, 'box-shadow: none;');
css = css.replace(/box-shadow: 0 1px 3px rgba\(0, 0, 0, 0\.05\);/g, 'box-shadow: none;');

// Sidebar
css = css.replace(/background: linear-gradient\(\n    135deg,\n    rgba\(102, 16, 31, 0\.1\),\n    rgba\(133, 90, 92, 0\.08\)\n  \);/g, 'background: #f3f4f6;');
css = css.replace(/background: rgba\(255, 255, 255, 0\.8\);/g, 'background: #f9fafb;');
css = css.replace(/border: 1px solid rgba\(226, 232, 240, 0\.8\);/g, 'border: 1px solid #e5e7eb;');
css = css.replace(/box-shadow: inset 0 2px 4px rgba\(15, 23, 42, 0\.02\);/g, 'box-shadow: none;');
css = css.replace(/box-shadow: 0 0 0 4px rgba\(102, 16, 31, 0\.1\), inset 0 2px 4px rgba\(15, 23, 42, 0\.01\);/g, 'box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.03);');

css = css.replace(/\.blog-sidebar__search-item:hover \{\n  background: rgba\(102, 16, 31, 0\.05\);\n  border-color: rgba\(102, 16, 31, 0\.2\);/g, '.blog-sidebar__search-item:hover {\n  background: #f3f4f6;\n  border-color: #d1d5db;');
css = css.replace(/\.blog-sidebar__category-item:hover \{\n  background: #ffffff;\n  border-color: var\(--cat-color, #66101f\);\n  box-shadow: 0 2px 10px rgba\(0, 0, 0, 0\.06\);\n  transform: translateX\(2px\);/g, '.blog-sidebar__category-item:hover {\n  background: #fafafa;\n  border-color: #e5e7eb;\n  box-shadow: none;\n  transform: translateX(2px);');

css = css.replace(/box-shadow: 0 2px 10px rgba\(0, 0, 0, 0\.06\);/g, 'box-shadow: none;');
css = css.replace(/box-shadow: 0 0 0 3px rgba\(102, 16, 31, 0\.12\);/g, 'box-shadow: none;');

css = css.replace(/\.blog-sidebar__cat-count \{\n  background: var\(--cat-color, #66101f\);\n  color: #ffffff;/g, '.blog-sidebar__cat-count {\n  background: #f3f4f6;\n  color: #111827;');

css = css.replace(/\.blog-sidebar__post-item:hover \{\n  background: #ffffff;\n  border-color: #dde4ef;\n  box-shadow: 0 2px 10px rgba\(15, 23, 42, 0\.06\);\n  transform: translateX\(2px\);/g, '.blog-sidebar__post-item:hover {\n  background: #fafafa;\n  border-color: rgba(0, 0, 0, 0.1);\n  box-shadow: none;\n  transform: translateX(2px);');

fs.writeFileSync('app/routes/blog-detail.css', css);
console.log('done');
