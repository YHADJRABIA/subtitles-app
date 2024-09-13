import { recordToWebsiteRoute } from '@/lib/datocms/recordInfo'
import { type NextRequest, NextResponse } from 'next/server'

import { getTranslations } from 'next-intl/server'
import {
  handleUnexpectedError,
  invalidRequestResponse,
  withCORS,
} from '@/utils/datoCms/api'
import { getLocaleFromSearchParam } from '@/utils/request'

export function OPTIONS() {
  return new Response('OK', withCORS())
}

type PreviewLink = {
  label: string
  url: string
  reloadPreviewOnRecordUpdate?: boolean | { delayInMs: number }
}

type WebPreviewsResponse = {
  previewLinks: PreviewLink[]
}

/**
 * Implements Previews webhook required for the "Web Previews" plugin:
 * https://www.datocms.com/marketplace/plugins/i/datocms-plugin-web-previews#the-previews-webhook
 */

// TODO: Add frontend indicator to highlight preview mode (or add /preview/) path prefix
const { SECRET_API_TOKEN: secretToken } = process.env

export async function POST(req: NextRequest): Promise<NextResponse> {
  const locale = getLocaleFromSearchParam(req)
  const t = await getTranslations({ locale, namespace: 'CMS' })
  try {
    const token = req.nextUrl.searchParams.get('token')

    if (token !== secretToken) {
      return invalidRequestResponse(t('invalid_token'), 401)
    }

    /**
     * The plugin sends the record and model for which the user wants a preview,
     * along with information about which locale is currently viewed in
     * the interface.
     */
    const { item, itemType, locale } = await req.json()

    // This info is needed to generate the associated frontend URL
    const url = await recordToWebsiteRoute(
      item,
      itemType.attributes.api_key,
      locale
    )

    const response: WebPreviewsResponse = { previewLinks: [] }

    const status = item.meta.status

    if (url) {
      /**
       * If status is not published, the current version is different
       * from the published one, so it's in draft version.
       */
      if (status !== 'published') {
        /**
         * Generates a URL that initially enters Next.js' draft mode, then
         * redirects to the desired URL.
         */
        response.previewLinks.push({
          label: t('draft_version'),
          url: new URL(
            /*
             * Generates the URL in a way that it first passes through the
             * draft-mode-enabling endpoint.
             */
            `/api/cms/draft-mode/enable?url=${url}&token=${token}&locale=${locale}`,
            req.url
          ).toString(),
        })
      }

      /** If status is not draft, it means it has a published version. */
      if (status !== 'draft') {
        /**
         * Generates a URL that first exits from Next.js' draft mode, then
         * redirects to the desired URL.
         */
        response.previewLinks.push({
          label: t('published_version'),
          url: new URL(
            `/api/cms/draft-mode/disable?url=${url}&locale=${locale}`,
            req.url
          ).toString(),
        })
      }
    }

    // Responds in format expected by the plugin
    return NextResponse.json(response, withCORS())
  } catch (err) {
    return handleUnexpectedError(err)
  }
}
