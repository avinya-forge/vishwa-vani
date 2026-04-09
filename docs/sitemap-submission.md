# Sitemap Submission Guide (PUB-011)

Vishwa-Vani automatically generates a `sitemap.xml` during the build process to ensure all scriptures and chapters are discoverable by search engines.

## Steps for Submission

### 1. Verify Sitemap Generation
After a successful build (`npm run build`), verify that `out/sitemap.xml` contains valid URLs pointing to `https://vishwavani.app`.

### 2. Google Search Console
1. Log in to [Google Search Console](https://search.google.com/search-console).
2. Add the property `https://vishwavani.app`.
3. In the sidebar, select **Sitemaps**.
4. Enter `sitemap.xml` in the "Add a new sitemap" field.
5. Click **Submit**.

### 3. Bing Webmaster Tools
1. Log in to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Add the property `https://vishwavani.app`.
3. Navigate to **Sitemaps** under the **Sitemaps** section.
4. Click **Submit sitemap** and enter `https://vishwavani.app/sitemap.xml`.

## Frequency
The sitemap should be re-submitted whenever a new book or major set of chapters is added to the library (e.g., when moving from Mahabharata Phase 1 to Phase 2).
