/**
 * Single source of truth for the public site origin.
 * Set NEXT_PUBLIC_SITE_URL per environment (Vercel → Settings → Environment Variables).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://vishwa-vani.co.uk').replace(/\/+$/, '')

/** Build an absolute URL on the public site origin, e.g. absoluteUrl('/og-image.jpg'). */
export function absoluteUrl(path = '/'): string {
  return new URL(path, `${SITE_URL}/`).toString()
}
