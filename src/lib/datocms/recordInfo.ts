import type { SchemaTypes } from '@datocms/cma-client'

/*
 * Both the "Web Previews" and "SEO/Readability Analysis" plugins from DatoCMS
 * need to know the URL of the site that corresponds to each DatoCMS record to
 * work properly. These two functions are responsible for returning this
 * information, and are used by the route handlers associated with the two
 * plugins:
 *
 * - src/app/api/cms/seo-analysis/route.ts
 * - src/app/api/cms/preview-links/route.ts
 */

// Matches document type to corresponding url route
export async function recordToWebsiteRoute(
  item: SchemaTypes.Item,
  itemTypeApiKey: string,
  locale: string
): Promise<string | null> {
  switch (itemTypeApiKey) {
    case 'about_page': {
      return '/about'
    }
    case 'series': {
      return `/series/${await recordToSlug(item, itemTypeApiKey, locale)}`
    }
    default:
      return null
  }
}

export function recordToSlug(
  item: SchemaTypes.Item,
  itemTypeApiKey: string,
  locale: string
) {
  switch (itemTypeApiKey) {
    case 'series': {
      return item.attributes.slug
    }
    default:
      return null
  }
}
