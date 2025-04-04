const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath;
  
  // Handle root path
  if (req.url === '/') {
    filePath = path.join(__dirname, 'public/index.html');
  }
  // Handle direct public file requests
  else if (req.url.startsWith('/public/')) {
    filePath = path.join(__dirname, req.url.substring(7)); // Remove '/public' prefix
  }
  // Handle JavaScript files from src
  else if (req.url.startsWith('/src/')) {
    filePath = path.join(__dirname, req.url);
  }
  // Default to public directory
  else {
    filePath = path.join(__dirname, 'public', req.url);
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';
  
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log(`Failed to load: ${filePath}`);
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(8000, () => {
  console.log('Server running on port 8000');
  console.log('Available paths:');
  console.log('- /public/index.html');
  console.log('- /src/main.js');
  console.log('- /public/...');
});