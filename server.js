const express = require('express');
const { unlink } = require('fs');
const path = require('path');
const puppeteer = require("puppeteer");

app = express();
app.get("/png/:url/:name", async (req, res) => {
    const browser = await puppeteer.launch({ headless: true, args: [
      '--no-sandbox',
      '--icognito',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0: Win64; x64) AppleWebKit/537.36 (WHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
    ] })
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(0);
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0: Win64; x64) AppleWebKit/537.36 (WHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36')
    await page.goto(req.params.url, {waitUntil: ['load'], devtools: true })
    await page.setViewport({ width: 1280, height: 2000 })
    image = await page.screenshot({fullPage: true})
    page.close()
    browser.close()
    res.contentType('image/png')
    res.send(image)
});

app.listen(8888, () => console.log('Server Started'));
module.exports = app;