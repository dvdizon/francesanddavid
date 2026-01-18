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
        const proposalButton = await page.waitForSelector('[data-proposal-trigger]', { state: 'visible', timeout: 5000 });
        const proposalVideo = await page.waitForSelector('[data-proposal-video]', { state: 'attached', timeout: 5000 });
        const autoplaySrc = await proposalVideo.getAttribute('data-autoplay-src');
        const initialSrc = await proposalVideo.getAttribute('src');
        assert.ok(autoplaySrc, 'Expected proposal video autoplay src to be defined');
        assert.ok(!initialSrc || !initialSrc.includes('autoplay=1'), 'Expected proposal video src to start without autoplay');

        await proposalButton.click();
        await page.waitForFunction((el) => {
            const src = el.getAttribute('src') || '';
            return src.includes('autoplay=1');
        }, proposalVideo);

        await page.goto(`http://127.0.0.1:${server.info.port}/wedding.html`, { waitUntil: 'load' });
        const scheduleButton = await page.waitForSelector('a.button-primary[href="#details"]', { state: 'visible', timeout: 5000 });
        await scheduleButton.click();
        await page.waitForFunction(() => window.location.hash === '#details');

        await page.goto(`http://127.0.0.1:${server.info.port}/program`, { waitUntil: 'load' });
        await page.waitForSelector('#pleaseNoPhotos', { state: 'visible', timeout: 5000 });
        const modalButton = await page.waitForSelector('#pleaseNoPhotos [data-dismiss="modal"]', { state: 'visible', timeout: 5000 });
        await modalButton.click();
        await page.waitForSelector('#pleaseNoPhotos', { state: 'hidden', timeout: 5000 });

        console.log('Browser CTA test passed.');
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
