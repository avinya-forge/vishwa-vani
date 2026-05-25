const { PlaywrightCrawler } = require('crawlee');
const fs = require('fs');
const path = require('path');

// This script scaffolds the extraction from Sacred Texts (SBE series).
// It extracts text from standard HTML formatting on the site to bypass blocks, since
// the network fetch showed access is now available without 403.
async function scrapeSBESource(targetUrl, bookName) {
    const crawler = new PlaywrightCrawler({
        maxRequestsPerCrawl: 1, // Start small to avoid ban
        async requestHandler({ page, request, log }) {
            log.info(`Processing ${request.url}`);
            const title = await page.title();
            log.info(`Title: ${title}`);
            // Simple generic extraction - looking for standard text elements
            const extracted = await page.evaluate(() => {
                const paragraphs = Array.from(document.querySelectorAll('p, blockquote'));
                return paragraphs.map(p => p.innerText.trim()).filter(t => t.length > 20);
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
