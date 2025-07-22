import {
  handleUnexpectedError,
  invalidRequestResponse,
  makeDraftModeWorkWithinIframes,
} from '@/utils/datoCms/api'
import { getLocaleFromSearchParam } from '@/utils/request'
import { isNonRelativeUrl } from '@/utils/string'
import { getTranslations } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import type { NextRequest } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const locale = getLocaleFromSearchParam(req)
  const t = await getTranslations({ locale, namespace: 'CMS' })

  const url = req.nextUrl.searchParams.get('url') || '/'

  try {
    // Avoid open redirect vulnerabilities
    if (isNonRelativeUrl(url)) {
      return invalidRequestResponse(t('non_relative_url'), 422)
    }
    const draftModeStatus = await draftMode()

    draftModeStatus.disable()
    makeDraftModeWorkWithinIframes()
  } catch (err) {
    return handleUnexpectedError(err)
  }

  redirect(`/${locale}/${url}`)
}
