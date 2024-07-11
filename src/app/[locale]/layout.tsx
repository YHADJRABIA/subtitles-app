import type { Metadata } from 'next'
import { Familjen_Grotesk, Inter } from 'next/font/google'
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'
import { ReactNode } from 'react'
import AppProvider from '@/context/AppProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const familjenGrotesk = Familjen_Grotesk({
  subsets: ['latin'],
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
      <body className={`${inter.variable} ${familjenGrotesk.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
