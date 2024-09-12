import { redirect } from '@/lib/i18n/navigation'
import { getLocaleFromNextRequest } from '@/utils/cookies'
import {
  handleUnexpectedError,
  invalidRequestResponse,
  makeDraftModeWorkWithinIframes,
} from '@/utils/datoCms/api'
import { isNonRelativeUrl } from '@/utils/string'
import { getTranslations } from 'next-intl/server'
import { draftMode } from 'next/headers'

import type { NextRequest } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const locale = getLocaleFromNextRequest(req)
  const t = await getTranslations({ locale, namespace: 'DraftMode' })

  const url = req.nextUrl.searchParams.get('url') || '/'

  try {
    // Avoid open redirect vulnerabilities
    if (isNonRelativeUrl(url)) {
      return invalidRequestResponse(t('non_relative_url'), 422)
    }

    draftMode().disable()
    makeDraftModeWorkWithinIframes()
  } catch (err) {
    return handleUnexpectedError(err)
  }

  redirect(url)
}
