const http = require('http');

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

const server = http.createServer((req, res) => {
    if (req.url === '/api/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else {
        res.writeHead(404);
        res.end();
    }
});

const port = 3001;
server.listen(port, () => {
    console.log(`Backend API server running on port ${port}`);
});
