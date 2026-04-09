# Deployment and Domain Configuration

## Domain Configuration (PUB-001)

The production domain is configured to **vishwavani.app**.

### Vercel Integration
- **A Records**: Point `@` to `76.76.21.21`
- **CNAME**: Point `www` to `cname.vercel-dns.com`

## DNS & Security Layer (PUB-002)

Cloudflare is used as the DNS and CDN layer.

### Configuration
- **SSL/TLS**: Set to "Full (Strict)"
- **DDoS Protection**: Enabled (Under Attack Mode available)
- **Edge Caching**: Configured for static assets in `public/` and `_next/static/`
- **WAF Rules**: Basic SQL injection and XSS protection enabled

### CDN Settings
- **Brotli**: Enabled
- **Auto Minify**: HTML, CSS, and JS enabled
- **Rocket Loader**: Disabled (to avoid issues with Hydration)
