import { Inter, Literata } from 'next/font/google'
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'
import { ReactNode } from 'react'
import AppProvider from '@/context/AppProvider'
import { getNextLocale } from '@/utils/cookies'
import { getTranslations } from 'next-intl/server'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-body' })
const literate = Literata({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-heading',
})

// Hacky way to account for 404's metadata
// TODO: find a batter way to apply page's metadata, this should only conain the whole app's meta
export const generateMetadata = async () => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('NotFound.title')}`,
    description: t('NotFound.description'),
  }
}

interface PropTypes {
  children: ReactNode
  params: { locale: string }
}

export default function LocaleLayout({
  children,
  params: { locale },
}: PropTypes) {
  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${literate.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
