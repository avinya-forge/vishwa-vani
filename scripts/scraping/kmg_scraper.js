const { PlaywrightCrawler } = require('crawlee');
const fs = require('fs');
const path = require('path');

// This script scaffolds the extraction from Sacred Texts for KMG Mahabharata.
async function scrapeKMGParva(parvaNumber, startAdhyaya, endAdhyaya) {
    const paddedParva = parvaNumber.toString().padStart(2, '0');

    // Construct URLs (Assuming standard structure mXX/mXXYYY.htm)
    const requests = [];
    for(let i=startAdhyaya; i<=endAdhyaya; i++) {
        const paddedAdhyaya = i.toString().padStart(3, '0');
        requests.push(`https://www.sacred-texts.com/hin/m${paddedParva}/m${paddedParva}${paddedAdhyaya}.htm`);
    }

    const crawler = new PlaywrightCrawler({
        maxRequestsPerCrawl: requests.length,
        async requestHandler({ page, request, log }) {
            log.info(`Processing ${request.url}`);

            // Extract the chapter number from the URL
            const urlParts = request.url.split('/');
            const filename = urlParts[urlParts.length - 1]; // e.g., m04001.htm
            const chapStr = filename.replace('.htm', '').slice(3); // e.g. 001
            const chapterNum = parseInt(chapStr, 10);

            const title = await page.title();

            // Extract content, looking for standard text elements
            const extracted = await page.evaluate(() => {
                const paragraphs = Array.from(document.querySelectorAll('p, blockquote'));
                // Filtering out the generic header/footer from sacred-texts
                return paragraphs
                    .map(p => p.innerText.trim())
                    .filter(t => t.length > 20 && !t.includes('Sacred Texts') && !t.includes('Hinduism') && !t.includes('Mahabharata'));
            });

            const outDir = path.join(__dirname, '..', '..', 'data', '1-bronze', `mahabharata-kmg-parva-${parvaNumber}`);
            if(!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }

            const outFile = path.join(outDir, `adhyaya-${chapterNum}.json`);
            fs.writeFileSync(outFile, JSON.stringify({ url: request.url, title, content: extracted }, null, 2));
            log.info(`Saved raw extract to ${outFile}`);
        },
        async failedRequestHandler({ request, log, error }) {
            log.error(`Request ${request.url} failed: ${error.message}`);
        }
    });

    await crawler.run(requests);
}

if(require.main === module) {
    const args = process.argv.slice(2);
    if(args.length === 3) {
        scrapeKMGParva(parseInt(args[0]), parseInt(args[1]), parseInt(args[2]));
    } else {
        console.log("Usage: node kmg_scraper.js <parva> <start_adhyaya> <end_adhyaya>");
        // Run test on Parva 4 Adhyaya 1 to 5
        scrapeKMGParva(4, 1, 5);
    }
}
module.exports = { scrapeKMGParva };
