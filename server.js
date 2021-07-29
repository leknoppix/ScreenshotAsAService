const express = require('express');
const fs = require('fs');
const puppeteer = require("puppeteer");
const path = require('path');

app = express();

app.get("/png/:url/:name", async (req, res) => {
  const pathToExtension = path.join(__dirname, 'extension/fihnjjcciajhdojfnbdddfaoknhalnja/3.3.1_0');
  const browser = await puppeteer.launch({ headless: false, args: [
    '--no-sandbox',
    '--icognito',
    '--user-agent=Mozilla/5.0 (Windows NT 10.0: Win64; x64) AppleWebKit/537.36 (WHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
    `--disable-extensions-except=${pathToExtension}`,
    `--load-extension=${pathToExtension}`,
  ] });
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0);
  await page.goto(req.params.url, {waitUntil: 'networkidle2' })
  await page.setViewport({ width: 1280, height: 720 })
  image = await page.screenshot({fullPage: true})
  page.close()
  browser.close()
  res.contentType('image/png')
  res.send(image)
});

app.listen(8888, () => console.log('Server Started'));
module.exports = app;