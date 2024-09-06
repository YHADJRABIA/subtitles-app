import { getLocaleFromNextRequest } from '@/utils/cookies'
import { getErrorMessage } from '@/utils/errors'
import { getTranslations } from 'next-intl/server'
import { revalidatePath } from 'next/cache'
import { NextResponse, NextRequest } from 'next/server'

const { NEXT_ISR_REVALIDATION_TOKEN: revalidationToken } = process.env

// Called by CMS webhook when content is published/unpublished
export async function POST(req: NextRequest) {
  // Check for secret to validate request
  const token = req.headers.get('authorization')
  const locale = getLocaleFromNextRequest(req)
  const t = await getTranslations({ locale, namespace: 'Revalidation' })

  try {
    if (token !== revalidationToken) {
      return NextResponse.json(
        { message: t('unauthorised'), success: false },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await req.json()
    // Get slug of page to revalidate
    const slug = body.slug_to_revalidate

    // Ensure that request body is not empty
    if (!body || !slug) {
      return NextResponse.json(
        { message: t('invalid_request'), success: false },
        { status: 400 }
      )
    }

    // Revalidate the page
    revalidatePath(`/series/${slug}`)
    return NextResponse.json({
      message: t('successful_revalidation'),
      success: true,
    })
  } catch (err) {
    return NextResponse.json(
      { message: getErrorMessage(err), success: false },
      { status: 500 }
    )
  }
}
