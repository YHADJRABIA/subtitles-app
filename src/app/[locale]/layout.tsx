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

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-body' })
const literate = Literata({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-heading',
})

export type ParamsType = { locale: Locale; slug: string }

export interface MetaDataProps {
  params: Promise<ParamsType>
}

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
