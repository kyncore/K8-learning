const http = require('http');
const fs = require('fs');

const DATA_FILE = '/data/timestamp.txt';

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const timestamp = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, timestamp);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Timestamp ${timestamp} saved.`);
  } else {
    let lastTimestamp = 'No timestamp saved yet.';
    if (fs.existsSync(DATA_FILE)) {
      lastTimestamp = fs.readFileSync(DATA_FILE, 'utf8');
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Last timestamp: ${lastTimestamp}`);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
