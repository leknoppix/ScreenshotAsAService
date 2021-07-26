const express = require('express');
const { unlink } = require('fs');
const path = require('path');
const puppeteer = require("puppeteer");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app = express();
app.get("/png/:url/:name", async (req, res) => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.goto(req.params.url, {waitUntil: ['load', 'networkidle0', 'domcontentloaded'] })
    await page.click(".cc_btn.cc_btn_accept_all")
    await page.waitForTimeout()
    await page.setViewport({ width: 1280, height: 2000 })
    const dest = path.join(__dirname, 'screenshot/' + req.params.name + '.png');
    image = await page.screenshot({fullPage: true})
    await page.close()
    await browser.close()
    res.contentType('image/png');
    res.send(image);
});
app.listen(8888, () => console.log('Server Started'));
module.exports = app;