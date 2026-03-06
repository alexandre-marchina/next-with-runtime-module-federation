#!/usr/bin/env node

import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distPath = path.join(rootDir, 'packages/ui-library/dist');

// Simple static file server for UI Library
const server = http.createServer((req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let filePath = path.join(distPath, req.url === '/' ? 'index.html' : req.url);

  // Remove query string
  filePath = filePath.split('?')[0];

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 - File not found: ${req.url}`);
      return;
    }

    const ext = path.extname(filePath);
    let contentType = 'text/plain';
    if (ext === '.json') contentType = 'application/json';
    else if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.css') contentType = 'text/css';
    else if (ext === '.html') contentType = 'text/html';
    else if (ext === '.wasm') contentType = 'application/wasm';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║  Production Mode - Module Federation POC                 ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  console.log(`✓ UI Library (static) running on http://localhost:${PORT}`);
  console.log(`✓ Manifest available at http://localhost:${PORT}/mf-manifest.json\n`);
  console.log('📝 Now start the Next.js apps in other terminals:');
  console.log('   Terminal 2: pnpm -F app-router run start');
  console.log('   Terminal 3: pnpm -F pages-router run start -- -p 3003\n');
  console.log('Press Ctrl+C to stop this server\n');
});

process.on('SIGINT', () => {
  console.log('\n👋 Shutting down UI Library server...');
  process.exit(0);
});
