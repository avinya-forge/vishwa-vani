# Scrapling Evaluation

## Overview
**Scrapling** (https://github.com/D4Vinci/Scrapling) is a Python-based adaptive web scraping framework designed to handle everything from single requests to full-scale web crawls. It is lightweight, fast, and claims to be an alternative to heavier frameworks by combining fetching, parsing, and structured data extraction into one cohesive library.

## Viability for Vishwa-Vani
Our current data scraping needs involve fetching classical texts (Mahabharata, Bhagavad Gita, Upanishads) from sources like `sacred-texts.com` and `wisdomlib.org`, which often employ Cloudflare or other anti-bot mechanisms.

**Pros of Scrapling:**
1. **Adaptive Scraping:** It provides built-in mechanisms to handle varied structures and potentially bypass basic anti-bot protections. Testing locally confirmed it is successfully able to bypass the 403 blocks from `sacred-texts.com` that were previously failing.
2. **Python ecosystem:** Python is generally more suited for complex NLP and text parsing pipelines that we run post-scraping (like `vishwa.py` and `test_vishwa.py`).
3. **Simplicity:** It provides an easy-to-use API combining HTTP requests and BeautifulSoup-like CSS selectors (`page.css()`).

**Cons/Roadblocks for immediate integration:**
1. **Ecosystem Clash:** The project currently relies on Node.js/TypeScript and `crawlee` (`PlaywrightCrawler`) for its scraping tasks. Replacing the Node.js scraping toolchain completely with Python means all future data pipeline tasks must be built via Python scripts (such as `use_scrapling.py`), which splits the scraping and processing stack.
2. **Environment Dependencies:** Running Scrapling requires an updated Python environment with `curl_cffi`, `browserforge`, `camoufox`, and other dependencies installed via `pip`, which might complicate the `Vercel`/`Next.js` build/deploy pipelines if they were to run there.

## Conclusion
`Scrapling` is an excellent tool, and we have successfully tested it in the sandbox (see `scripts/scraping/use_scrapling.py`). Because it is able to bypass the `sacred-texts.com` blocks that previously halted our `MBH-DATA-*` and `KENA-*` pipelines, we should highly consider using this Python framework exclusively for our data gathering going forward.

We have added `scripts/scraping/use_scrapling.py` as the baseline script to construct any future scrapers.
