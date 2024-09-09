import { websiteUrl } from '@/utils/general'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${websiteUrl}/sitemap.xml`,
  }
}
