const { HttpCrawler } = require('crawlee');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// This script scaffolds the extraction from GRETIL for high-accuracy Sanskrit texts.
async function scrapeGRETIL(targetUrl, bookName) {
    const crawler = new HttpCrawler({
        async requestHandler({ request, body, log }) {
            log.info(`Processing ${request.url}`);

            const $ = cheerio.load(body);
            const title = $('title').text();
            log.info(`Title: ${title}`);

            // Extract content: GRETIL often uses plain text format within pre or specific divs.
            // We'll scaffold a generic text extraction looking for common GRETIL structures.
            // Often, it might be preformatted text <pre>.
            let extracted = [];
            if ($('pre').length > 0) {
                // If it's a plain text dump inside <pre>
                const preText = $('pre').text();
                extracted = preText.split('\n').map(line => line.trim()).filter(line => line.length > 5);
            } else {
                // Fallback to p, br formatting
                 $('body').contents().each(function() {
                    if (this.type === 'text') {
                        const t = $(this).text().trim();
                        if (t.length > 5) {
                            extracted.push(t);
                        }
                    } else if (this.name === 'br' || this.name === 'p' || this.name === 'div') {
                         const t = $(this).text().trim();
                         if (t.length > 5 && this.name !== 'br') { // br itself has no text, but its children might in some weird DOM
                             extracted.push(t);
                         }
                    }
                });
            }

            const outDir = path.join(__dirname, '..', '..', 'data', '1-bronze');
            if(!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

            const outFile = path.join(outDir, `${bookName}-gretil-raw.json`);
            fs.writeFileSync(outFile, JSON.stringify({ url: request.url, title, content: extracted }, null, 2));
            log.info(`Saved raw extract to ${outFile}`);
        },
        async failedRequestHandler({ request, log, error }) {
            log.error(`Request ${request.url} failed: ${error.message}`);
        }
    });

    await crawler.run([targetUrl]);
}

if(require.main === module) {
    // Scaffold test run for a mock or generic GRETIL text
    // E.g. using a dummy request or a known public domain URL if provided.
    console.log("Usage: node gretil_scraper.js <url> <book_name>");
    // Example: scrapeGRETIL('http://gretil.sub.uni-goettingen.de/gretil/1_sanskr/4_rellit/buddh/bsu001_u.htm', 'buddha-carita');
}
module.exports = { scrapeGRETIL };
