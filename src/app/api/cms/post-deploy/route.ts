import {
  handleUnexpectedError,
  successfulResponse,
  withCORS,
} from '@/utils/datoCms/api'
import { type Client, buildClient } from '@datocms/cma-client'
import type { NextRequest, NextResponse } from 'next/server'

/*
 * This endpoint is called only once, immediately after this project's initial,
 *  deployment to set up some DatoCMS settings. Can be removed afterwards.
 */

export function OPTIONS() {
  return new Response('OK', withCORS())
}

/**
 * Installs and configure the "Web Previews" plugin
 *
 * https://www.datocms.com/marketplace/plugins/i/datocms-plugin-web-previews
 */

const { SECRET_API_TOKEN: secretToken } = process.env
async function installWebPreviewsPlugin(client: Client, baseUrl: string) {
  const webPreviewsPlugin = await client.plugins.create({
    package_name: 'datocms-plugin-web-previews',
  })

  await client.plugins.update(webPreviewsPlugin, {
    parameters: {
      frontends: [
        {
          name: 'Production',
          previewWebhook: new URL(
            `/api/cms/preview-links?token=${secretToken}`,
            baseUrl
          ).toString(),
        },
        {
          name: 'Staging',
          previewWebhook: new URL(
            `/api/cms/preview-links?token=${secretToken}`,
            baseUrl
          ).toString(),
        },
        /*  {
          name: 'Development',
          previewWebhook: new URL(
            `/api/cms/preview-links?token=${secretToken}`,
            baseUrl
          ).toString(),
        }, */
      ],
      startOpen: true,
    },
  })
}

/**
 * Installs and configures the "SEO/Readability Analysis" plugin
 *
 * https://www.datocms.com/marketplace/plugins/i/datocms-plugin-seo-readability-analysis
 */
/* async function installSEOAnalysisPlugin(client: Client, baseUrl: string) {
  const seoPlugin = await client.plugins.create({
    package_name: 'datocms-plugin-seo-readability-analysis',
  })

  await client.plugins.update(seoPlugin.id, {
    parameters: {
      htmlGeneratorUrl: new URL(
        `/api/cms/seo-analysis?token=${process.env.SECRET_API_TOKEN}`,
        baseUrl
      ).toString(),
      autoApplyToFieldsWithApiKey: 'seo_analysis',
      setSeoReadabilityAnalysisFieldExtensionId: true,
    },
  })
}
 */
/**
 * Setup a webhook to be notified when anything changes, and invalidate Next.js cache
 */
/* async function createCacheInvalidationWebhook(client: Client, baseUrl: string) {
  await client.webhooks.create({
    name: '🔄 Invalidate Next.js Cache',
    url: new URL(
      `/api/cms/invalidate-cache?token=${process.env.SECRET_API_TOKEN}`,
      baseUrl
    ).toString(),
    custom_payload: null,
    headers: {},
    events: [
      {
        filters: [],
        entity_type: 'cda_cache_tags',
        event_types: ['invalidate'],
      },
    ],
    http_basic_user: null,
    http_basic_password: null,
  })
} */

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json()

  const client = buildClient({ apiToken: body.datocmsApiToken })
  const baseUrl = body.frontendUrl as string

  try {
    /*     await Promise.all([
      installWebPreviewsPlugin(client, baseUrl),
      createCacheInvalidationWebhook(client, baseUrl),
      installSEOAnalysisPlugin(client, baseUrl),
    ]) */

    await installWebPreviewsPlugin(client, baseUrl)

    return successfulResponse()
  } catch (error) {
    return handleUnexpectedError(error)
  }
}
