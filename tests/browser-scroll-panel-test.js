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
        await page.goto(`http://127.0.0.1:${server.info.port}/`, { waitUntil: 'load' });

        const panel = await page.waitForSelector('.scroll-panel-content', { state: 'visible', timeout: 5000 });
        const isVisible = await panel.isVisible();
        assert.ok(isVisible, 'Expected the scroll panel content to be visible');

        const revealTarget = await page.waitForSelector('[data-reveal]', { state: 'attached', timeout: 5000 });
        await page.evaluate(() => {
            window.scrollTo(0, Math.round(document.body.scrollHeight * 0.4));
        });
        await page.waitForFunction((el) => el.classList.contains('is-visible'), revealTarget, { timeout: 10000 });

        console.log('Browser scroll panel test passed.');
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
