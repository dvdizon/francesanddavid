'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
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

const assertNoDeprecatedWindowLoad = () => {
    const deprecatedPatterns = [
        /\$\(\s*window\s*\)\.load\s*\(/,
    ];
    const filesToCheck = [
        path.join(__dirname, '..', 'assets', 'js', 'index.js'),
        path.join(__dirname, '..', 'assets', 'js', 'program.js'),
    ];

    filesToCheck.forEach((filePath) => {
        const contents = fs.readFileSync(filePath, 'utf8');
        deprecatedPatterns.forEach((pattern) => {
            assert.ok(!pattern.test(contents), `Deprecated jQuery window load handler found in ${filePath}`);
        });
    });
};

const run = async () => {
    assertNoDeprecatedWindowLoad();
    const server = await startServer({ host: '127.0.0.1', port: 0 });
    try {
        const { res, body } = await request(`http://127.0.0.1:${server.info.port}/`);
        assert.strictEqual(res.statusCode, 200, 'Expected / to return 200');
        assert.ok(body.includes('Frances and David'), 'Expected homepage content to render');
        const health = await request(`http://127.0.0.1:${server.info.port}/health`);
        assert.strictEqual(health.res.statusCode, 200, 'Expected /health to return 200');
        assert.strictEqual(health.body, 'ok', 'Expected /health to return ok');
        console.log('Smoke test passed.');
    } finally {
        await server.stop();
    }
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});

