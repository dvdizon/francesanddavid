'use strict';

const assert = require('assert');
const { chromium } = require('playwright');
const { startServer } = require('../index');

const run = async () => {
    const server = await startServer({ host: '127.0.0.1', port: 0 });
    let browser;
    try {
        browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(`http://127.0.0.1:${server.info.port}/program`, { waitUntil: 'load' });
        const modal = await page.waitForSelector('#pleaseNoPhotos', { state: 'visible', timeout: 5000 });
        const isVisible = await modal.isVisible();
        assert.ok(isVisible, 'Expected the program modal to be visible');
        console.log('Browser modal test passed.');
    } finally {
        if (browser) {
            await browser.close();
        }
        await server.stop();
    }
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
