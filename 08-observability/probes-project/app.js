const http = require('http');

let isReady = false;
let isHealthy = true;

// Simulate a slow startup
setTimeout(() => {
    isReady = true;
    console.log('Application is now ready to accept traffic.');
}, 15000); // 15 seconds

const server = http.createServer((req, res) => {
    if (req.url === '/healthz') {
        if (isHealthy) {
            res.writeHead(200);
            res.end('OK');
        } else {
            res.writeHead(500);
            res.end('Unhealthy');
        }
    } else if (req.url === '/readyz') {
        if (isReady) {
            res.writeHead(200);
            res.end('OK');
        } else {
            res.writeHead(503);
            res.end('Not Ready');
        }
    } else if (req.url === '/break') {
        isHealthy = false;
        res.writeHead(200);
        res.end('Application is now marked as unhealthy.');
        console.log('Application will now fail liveness checks.');
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, World!');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}. It will be ready in 15 seconds.`);
});
