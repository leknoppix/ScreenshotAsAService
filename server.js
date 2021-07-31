const express = require('express');
const process = require('process');
const puppeteer = require("puppeteer");
const dotenv = require('dotenv');
dotenv.config();
app = express();

app.get("/png/:url/:name", async (req, res) => {
  const url = `ws://${process.env.WSCHROME}:${process.env.WSCHROME_PORT}/`;
  console.log(url)
  const browser = await puppeteer.connect({ 
    browserWSEndpoint:url
  });
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0);
  await page.goto(req.params.url, {waitUntil: 'networkidle2' })
  await page.setViewport({ width: 1400, height: 720 })
  image = await page.screenshot({fullPage: true})
  page.close()
  browser.close()
  res.contentType('image/png')
  res.send(image)
});

app.listen(8888, () => console.log('Server Started'));
module.exports = app;