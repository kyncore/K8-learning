const http = require('http');
const fs = require('fs');
const os = require('os');

const DATA_DIR = '/data';
const DATA_FILE = `${DATA_DIR}/hostname.txt`;

// Create the data directory if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

const server = http.createServer((req, res) => {
    // On the first run, write the hostname to the file
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, os.hostname());
    }

    const storedHostname = fs.readFileSync(DATA_FILE, 'utf8');

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello from Pod: ${os.hostname()}\nMy stable identity is: ${storedHostname}\n`);
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
