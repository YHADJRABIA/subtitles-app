import {
  handleUnexpectedError,
  invalidRequestResponse,
  makeDraftModeWorkWithinIframes,
} from '@/utils/datoCms/api'
import { draftMode } from 'next/headers'
import { redirect } from '@/lib/i18n/navigation'
import type { NextRequest } from 'next/server'
import { getLocaleFromNextRequest } from '@/utils/cookies'
import { getTranslations } from 'next-intl/server'
import { isNonRelativeUrl } from '@/utils/string'

export const dynamic = 'force-dynamic'

const { SECRET_API_TOKEN: secretToken } = process.env

export async function GET(req: NextRequest) {
  const locale = getLocaleFromNextRequest(req)
  const t = await getTranslations({ locale, namespace: 'DraftMode' })

  // Parse query string parameters
  const token = req.nextUrl.searchParams.get('token')
  const url = req.nextUrl.searchParams.get('url') || '/'

  try {
    // Ensure that the request is coming from a trusted source
    if (token !== secretToken) {
      return invalidRequestResponse(t('invalid_token'), 401)
    }

    // Avoid open redirect vulnerabilities
    if (isNonRelativeUrl(url)) {
      return invalidRequestResponse(t('non_relative_url'), 422)
    }

    draftMode().enable()

    makeDraftModeWorkWithinIframes()
  } catch (err) {
    return handleUnexpectedError(err)
  }

  redirect(url)
}
