const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const clientCandidates = ['client-legacy', 'client'];
const clientDir =
  clientCandidates
    .map((d) => path.join(rootDir, d))
    .find((p) => fs.existsSync(p)) || path.join(rootDir, 'client-legacy');
const clientDist = path.join(clientDir, 'dist');
const pagesSrc = path.join(clientDir, 'src', 'pages');
const cssSrc = path.join(clientDir, 'src', 'css');
const pagesDist = path.join(clientDist, 'pages');
const cssDist = path.join(clientDist, 'css');
const serverDir = path.join(rootDir, 'server');
const packagedDist = path.join(serverDir, 'public-client', 'dist');

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

function copyDirRecursive(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function run() {
  try {
    console.log(`→ Building frontend (${path.basename(clientDir)})...`);
    execSync('npm install', { cwd: clientDir, stdio: 'inherit' });
    execSync('npx tsc', { cwd: clientDir, stdio: 'inherit' });
    ensureDir(pagesDist);
    ensureDir(cssDist);
    copyAll(pagesSrc, pagesDist);
    copyAll(cssSrc, cssDist);
    // Package built frontend into server/public-client/dist for deployment
    copyDirRecursive(clientDist, packagedDist);
    console.log('✓ Frontend build completed');
  } catch (err) {
    console.error('✗ Frontend build failed:', err.message || err);
    process.exit(1);
  }
}

run();
