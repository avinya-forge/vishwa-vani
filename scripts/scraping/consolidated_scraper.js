const { PlaywrightCrawler } = require('crawlee');
const fs = require('fs');
const path = require('path');

/**
 * Universal Scraper utilizing PlaywrightCrawler from crawlee.
 * Consolidates extraction logic for KMG, SBE, and Gita Press into one runner.
 */
class UniversalScraper {
    constructor() {
        this.crawler = new PlaywrightCrawler({
            maxRequestsPerCrawl: 50,
            async requestHandler({ page, request, log }) {
                log.info(`Processing ${request.url}`);
                const title = await page.title();
                log.info(`Title: ${title}`);

                // Determine source type
                if (request.url.includes('sacred-texts.com/hin/m')) {
                    await UniversalScraper.handleKMG(page, request, log, title);
                } else if (request.url.includes('sacred-texts.com/hin/sbe')) {
                    await UniversalScraper.handleSBE(page, request, log, title);
                } else if (request.url.includes('gitapress')) {
                    await UniversalScraper.handleGitaPress(page, request, log, title);
                } else {
                    log.info(`Generic scraping for ${request.url}`);
                    await UniversalScraper.handleGeneric(page, request, log, title);
                }
            },
            async failedRequestHandler({ request, log, error }) {
                log.error(`Request ${request.url} failed: ${error.message}`);
            }
        });
    }

    static getOutDir(subDir) {
        const outDir = path.join(__dirname, '..', '..', 'data', '1-bronze', subDir);
        if(!fs.existsSync(outDir)) { fs.mkdirSync(outDir, {recursive: true}); }
        return outDir;
    }

    static async handleKMG(page, request, log, title) {
        // Extract the chapter number from the URL
        const urlParts = request.url.split('/');
        const filename = urlParts[urlParts.length - 1]; // e.g., m04001.htm
        const parvaStr = filename.replace('.htm', '').slice(1, 3);
        const chapStr = filename.replace('.htm', '').slice(3); // e.g. 001

        const parvaNumber = parseInt(parvaStr, 10);
        const chapterNum = parseInt(chapStr, 10);

        const extracted = await page.evaluate(() => {
            const paragraphs = Array.from(document.querySelectorAll('p, blockquote'));
            return paragraphs
                .map(p => p.innerText.trim())
                .filter(t => t.length > 20 && !t.includes('Sacred Texts') && !t.includes('Hinduism') && !t.includes('Mahabharata'));
        });

        const outDir = UniversalScraper.getOutDir(`mahabharata-kmg-parva-${parvaNumber}`);
        const outFile = path.join(outDir, `adhyaya-${chapterNum}.json`);
        fs.writeFileSync(outFile, JSON.stringify({ url: request.url, title, content: extracted }, null, 2));
        log.info(`Saved raw extract to ${outFile}`);
    }

    static async handleSBE(page, request, log, title) {
        const extracted = await page.evaluate(() => {
            const paragraphs = Array.from(document.querySelectorAll('p, blockquote'));
            return paragraphs.map(p => p.innerText.trim()).filter(t => t.length > 20);
        });

        const outDir = UniversalScraper.getOutDir(`sbe-scraped`);
        const urlParts = request.url.split('/');
        const bookName = urlParts[urlParts.length - 1].replace('.htm', '');

        const file = path.join(outDir, `${bookName}-scraped-raw.json`);
        fs.writeFileSync(file, JSON.stringify({ url: request.url, title, content: extracted }, null, 2));
        log.info(`Saved SBE extract to ${file}`);
    }

    static async handleGitaPress(page, request, log, title) {
        // Scaffold logic for Gita Press
        log.info(`GitaPress processing logic placeholder for ${request.url}`);
    }

    static async handleGeneric(page, request, log, title) {
        const extracted = await page.evaluate(() => {
            return document.body.innerText.trim();
        });
        const outDir = UniversalScraper.getOutDir(`generic-scraped`);
        const file = path.join(outDir, `${Date.now()}-scraped.json`);
        fs.writeFileSync(file, JSON.stringify({ url: request.url, title, content: extracted.substring(0, 1000) }, null, 2));
        log.info(`Saved generic extract to ${file}`);
    }

    async run(requests) {
        await this.crawler.run(requests);
    }
}

if(require.main === module) {
    const scraper = new UniversalScraper();

    const args = process.argv.slice(2);
    if(args.length > 0) {
        scraper.run(args).catch(console.error);
    } else {
        console.log("Usage: node consolidated_scraper.js <url1> <url2> ...");
        console.log("Example: node consolidated_scraper.js https://www.sacred-texts.com/hin/sbe01/sbe01166.htm");
    }
}

module.exports = { UniversalScraper };
