const { HttpCrawler } = require('crawlee');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

async function scrapeGitaPress() {
    const crawler = new HttpCrawler({
        async requestHandler({ request, body, log }) {
            log.info(`Processing ${request.url}`);
            const $ = cheerio.load(body);
            const title = $('title').text();
            log.info(`Title: ${title}`);
            // This is just a scaffold logic. It needs a target URL.
        },
    });

    // Add requests
    // await crawler.addRequests(['https://example.com/gitapress']);

    // Run the crawler
    // await crawler.run();
}
console.log('Crawlee and HttpCrawler successfully installed and available for writing generic, scalable scrapers.');
// scrapeGitaPress();
