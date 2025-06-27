import {
  handleUnexpectedError,
  invalidRequestResponse,
  makeDraftModeWorkWithinIframes,
} from '@/utils/datoCms/api'
import { draftMode } from 'next/headers'
import type { NextRequest } from 'next/server'
import { getTranslations } from 'next-intl/server'
import { isNonRelativeUrl } from '@/utils/string'
import { redirect } from 'next/navigation'
import { getLocaleFromSearchParam } from '@/utils/request'

export const dynamic = 'force-dynamic'

const { SECRET_API_TOKEN: secretToken } = process.env

export async function GET(req: NextRequest) {
  const locale = getLocaleFromSearchParam(req)
  const t = await getTranslations({ locale, namespace: 'CMS' })

  // Parse query string parameters
  const token = req.nextUrl.searchParams.get('token')
  const url = req.nextUrl.searchParams.get('url') || '/'

  try {
    const draftModeStatus = await draftMode()
    // Ensure that the request is coming from a trusted source
    if (token !== secretToken) {
      return invalidRequestResponse(t('invalid_token'), 401)
    }

    // Avoid open redirect vulnerabilities
    if (isNonRelativeUrl(url)) {
      return invalidRequestResponse(t('non_relative_url'), 422)
    }

    draftModeStatus.enable()

    makeDraftModeWorkWithinIframes()
  } catch (err) {
    return handleUnexpectedError(err)
  }

  redirect(`/${locale}/${url}`)
}
