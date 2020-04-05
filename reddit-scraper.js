const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const url = "https://reddit.com/r/news/";

puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => {
    return page.goto(url).then(() => page.content());
  })
  .then(html => {
    // console.log(html);
    const $ = cheerio.load(html);
    const headlines = [];
    $('[href*="/r/news/comments"] h3').each(function(i, element) {
      headlines.push({
        title: $(this).text()
      });
    });
    console.log(headlines);
  });
