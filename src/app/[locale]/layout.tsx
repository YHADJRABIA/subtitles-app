import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'
import { ReactNode } from 'react'
import AppProvider from '@/context/AppProvider'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-body' })
const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: 'Subtitles app',
  description: 'Update description here',
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
      <body className={`${inter.variable} ${nunito.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
