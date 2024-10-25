'use client'
import { defaultLocale } from '@/i18n/routing'
import Error from 'next/error'

// This page is hit when request is made to route not handled by next-intl's middleware (i.e. not triggering middleware's matcher config)
export default function NotFoundPage() {
  return (
    <html lang={defaultLocale}>
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  )
}
