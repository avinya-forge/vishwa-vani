import type { MetadataRoute } from 'next'
import { getAllTextChapterPaths } from '@/lib/texts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vishwavani.app'

  // Add all static routes
  const routes = ['', '/search', '/lab'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))

  // Add all dynamic chapter paths
  const chapterPaths = getAllTextChapterPaths().map(path => ({
    url: `${baseUrl}/${path.text}/${path.chapter}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...routes, ...chapterPaths]
}
