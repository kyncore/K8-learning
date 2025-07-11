const http = require('http');
const client = require('prom-client');

// Create a Registry to register the metrics
const register = new client.Registry();

// Add a default label (service name) to the registry
register.setDefaultLabels({
  serviceName: 'monitoring-app',
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Create a custom counter metric
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path'],
});
register.registerMetric(httpRequestCounter);

const server = http.createServer(async (req, res) => {
    // Increment the counter for every request
    httpRequestCounter.inc({ method: req.method, path: req.url });

    if (req.url === '/metrics') {
        res.setHeader('Content-Type', register.contentType);
        res.end(await register.metrics());
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello! Visit /metrics to see the collected data.');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
