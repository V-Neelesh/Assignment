const fs = require('fs');
const path = require('path');

// Configuration
const srcDir = path.join(__dirname, 'src');
const publicDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Function to copy directory recursively
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// 1. Copy public folder contents to dist root (so /images works)
console.log('Copying public assets...');
copyDir(publicDir, distDir);

// 2. Copy CSS
console.log('Copying CSS...');
copyDir(path.join(srcDir, 'css'), path.join(distDir, 'css'));

// 3. Copy and Transform HTML
console.log('Processing HTML...');
const pagesDir = path.join(srcDir, 'pages');
const distPagesDir = path.join(distDir, 'pages');

if (!fs.existsSync(distPagesDir)) {
    fs.mkdirSync(distPagesDir, { recursive: true });
}

const htmlFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));

for (const file of htmlFiles) {
    let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    
    // Replace .ts imports with .js
    content = content.replace(/\.ts"/g, '.js"');
    
    fs.writeFileSync(path.join(distPagesDir, file), content);
    console.log(`Processed ${file}`);
}

console.log('Build preparation complete.');
