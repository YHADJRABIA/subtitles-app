import { Inter, Literata } from 'next/font/google'
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'
import { ReactNode } from 'react'
import AppProvider from '@/context/AppProvider'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next/types'
import { Locale } from '@/types/locale'
import { Analytics } from '@vercel/analytics/react'
import { websiteUrl } from '@/utils/general'
import { GOOGLE_SEARCH_CONSOLE_VERIFICATION } from '@/utils/constants'
import { routing } from '@/i18n/routing'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-body' })
const literate = Literata({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-heading',
})

export type ParamsType = { locale: Locale; slug: string }

export interface MetaDataProps {
  params: Promise<ParamsType>
}

export const generateStaticParams = () =>
  routing.locales.map(locale => ({ locale }))

export const generateMetadata = async ({
  params,
}: MetaDataProps): Promise<Metadata> => {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    metadataBase: new URL(websiteUrl),

    title: {
      template: `${t('prefix')} %s`,
      default: t('site_name'),
    },
    description: t('Homepage.description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('site_name'),
      description: t('Homepage.description'),
      url: websiteUrl, // Doesn't accept localhost:3000
      siteName: t('site_name'),
      images: [
        {
          url: '/logo.svg',
          width: 800,
          height: 600,
        },
      ],
      locale,
      type: 'website',
    },
    verification: {
      google: GOOGLE_SEARCH_CONSOLE_VERIFICATION,
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/manifest.webmanifest',
  }
}

interface LayoutProps {
  params: Promise<{ locale: string }>
  children: ReactNode
}

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const { locale } = await params

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${literate.variable}`}>
        <AppProvider>{children}</AppProvider>
        <Analytics />
      </body>
    </html>
  )
}
