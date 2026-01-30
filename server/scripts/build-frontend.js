const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const clientDir = path.join(rootDir, 'client-legacy');
const clientDist = path.join(clientDir, 'dist');
const pagesSrc = path.join(clientDir, 'src', 'pages');
const cssSrc = path.join(clientDir, 'src', 'css');
const pagesDist = path.join(clientDist, 'pages');
const cssDist = path.join(clientDist, 'css');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyAll(srcDir, destDir) {
  const items = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const item of items) {
    if (item.isFile()) {
      fs.copyFileSync(path.join(srcDir, item.name), path.join(destDir, item.name));
    }
  }
}

function run() {
  try {
    console.log('→ Building frontend (client-legacy)...');
    execSync('npm install', { cwd: clientDir, stdio: 'inherit' });
    execSync('npx tsc', { cwd: clientDir, stdio: 'inherit' });
    ensureDir(pagesDist);
    ensureDir(cssDist);
    copyAll(pagesSrc, pagesDist);
    copyAll(cssSrc, cssDist);
    console.log('✓ Frontend build completed');
  } catch (err) {
    console.error('✗ Frontend build failed:', err.message || err);
    process.exit(1);
  }
}

run();
