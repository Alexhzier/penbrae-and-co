/**
 * PENBRAE & CO LTD — VERCEL STATIC + HYBRID BUILD SCRIPT
 * Pre-renders all editorial & e-commerce routes, sitemap.xml, and robots.txt into `public/`
 * and copies CSS, JS, and photography assets from `wp-content/themes/penbrae/assets/`.
 */

const fs = require('fs');
const path = require('path');
const {
  getRouteHtml,
  getAllStaticRoutes,
  generateSitemapXml,
  generateRobotsTxt,
  THEME_DIR
} = require('../preview-server/server');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDirectoryFiltered(srcDir, destDir, filterFn) {
  if (!fs.existsSync(srcDir)) return;
  ensureDir(destDir);
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirectoryFiltered(srcPath, destPath, filterFn);
    } else if (!filterFn || filterFn(entry.name)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function build() {
  ensureDir(PUBLIC_DIR);

  // 1. Copy CSS, JS, and JPG/SVG assets into public/assets
  const srcAssets = path.join(THEME_DIR, 'assets');
  const destAssets = path.join(PUBLIC_DIR, 'assets');
  copyDirectoryFiltered(srcAssets, destAssets, (fileName) => {
    // Skip duplicate .png files in public build since .jpg versions are used everywhere
    return !fileName.toLowerCase().endsWith('.png');
  });

  // 2. Pre-render all routes as clean URL HTML files in public/
  const routes = getAllStaticRoutes();
  for (const route of routes) {
    const { html } = getRouteHtml(route);
    if (route === '/') {
      fs.writeFileSync(path.join(PUBLIC_DIR, 'index.html'), html, 'utf8');
    } else {
      const relPath = route.replace(/^\/+/, '');
      const targetFile = path.join(PUBLIC_DIR, `${relPath}.html`);
      ensureDir(path.dirname(targetFile));
      fs.writeFileSync(targetFile, html, 'utf8');
    }
  }

  // 3. Write sitemap.xml and robots.txt
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), generateSitemapXml(), 'utf8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), generateRobotsTxt(), 'utf8');

  console.log(`Built ${routes.length} static routes, sitemap.xml, robots.txt, and copied theme assets into ${PUBLIC_DIR}`);
}

build();
