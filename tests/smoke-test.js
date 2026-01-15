'use strict';

const http = require('http');
const assert = require('assert');
const { startServer } = require('../index');

const request = (url) => new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });
        res.on('end', () => {
            resolve({ res, body });
        });
    });
    req.on('error', reject);
});

const run = async () => {
    const server = await startServer({ host: '127.0.0.1', port: 0 });
    try {
        const { res, body } = await request(`http://127.0.0.1:${server.info.port}/`);
        assert.strictEqual(res.statusCode, 200, 'Expected / to return 200');
        assert.ok(body.includes('Frances and David'), 'Expected homepage content to render');
        console.log('Smoke test passed.');
    } finally {
        await server.stop();
    }
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
