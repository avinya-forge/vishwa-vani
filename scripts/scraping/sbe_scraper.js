const { HttpCrawler } = require('crawlee');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// This script scaffolds the extraction from Sacred Texts (SBE series).
// It extracts text from standard HTML formatting on the site to bypass blocks, since
// the network fetch showed access is now available without 403.
async function scrapeSBESource(targetUrl, bookName) {
    const crawler = new HttpCrawler({
        maxRequestsPerCrawl: 1, // Start small to avoid ban
        async requestHandler({ request, body, log }) {
            log.info(`Processing ${request.url}`);
            const $ = cheerio.load(body);
            const title = $('title').text();
            log.info(`Title: ${title}`);
            // Simple generic extraction - looking for standard text elements
            const extracted = [];
            $('p, blockquote').each((i, el) => {
                const t = $(el).text().trim();
                if (t.length > 20) {
                    extracted.push(t);
                }
            });

            const outDir = path.join(__dirname, '..', '..', 'data', '1-bronze');
            if(!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

            const file = path.join(outDir, `${bookName}-scraped-raw.json`);
            fs.writeFileSync(file, JSON.stringify({ url: request.url, title, content: extracted }, null, 2));
            log.info(`Saved raw extract to ${file}`);
        },
    });

    await crawler.run([targetUrl]);
}

if(require.main === module) {
    // Scaffold test run for Kena Upanishad SBE 1 (Max Muller)
    scrapeSBESource('https://www.sacred-texts.com/hin/sbe01/sbe01166.htm', 'kena-upanishad');
}
module.exports = { scrapeSBESource };
