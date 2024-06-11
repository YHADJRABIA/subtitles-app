import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useLocale } from 'next-intl'
import { getLanguageByLocaleValue } from '@/utils/language'
import { useDelocalisedPathname } from './useDelocalisePathname'
import { Locale } from '@/types/locale'

/**
 * Provides current language with corresponding flag & label.
 * Allows to switch into language of provided locale by redirecting to matching route.
 * Provides pending state of language change and opening state of language menu.
 */

const useChangeLanguage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const unlocalisedPathname = useDelocalisedPathname()
  const currentLocale = useLocale()

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(
    getLanguageByLocaleValue(currentLocale as Locale)
  )

  const handleClose = () => setIsOpen(false)

  const onChangeLanguage = (locale: Locale) => {
    if (locale === currentLocale) return handleClose()

    const selectedLanguage = getLanguageByLocaleValue(locale)

    if (selectedLanguage) {
      startTransition(() => {
        setCurrentLanguage(selectedLanguage)
        const queryString = searchParams.toString()
        const queryParams = queryString ? `?${queryString}` : ''
        router.replace(`/${locale}/${unlocalisedPathname}${queryParams}`)
      })
    }
  }

  return {
    isPending,
    isOpen,
    setIsOpen,
    currentLanguage,
    handleClose,
    onChangeLanguage,
  }
}

export default useChangeLanguage