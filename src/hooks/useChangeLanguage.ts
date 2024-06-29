import { useState, useTransition } from 'react'
import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { getLanguageByLocaleValue } from '@/utils/internationalisation/language'
import { Locale } from '@/types/locale'
import { useRouter, usePathname } from '@/lib/i18n/navigation'
import { useGetQueryParams } from './useGetQueryParams'

/**
 * Provides current language with corresponding flag & label.
 * Allows to switch into language of provided locale by redirecting to matching route.
 * Provides pending state of language change and opening state of language menu.
 */

const useChangeLanguage = () => {
  const currentLocale = useLocale() as Locale
  const queryParams = useGetQueryParams()
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(
    getLanguageByLocaleValue(currentLocale)
  )

  const handleClose = () => setIsOpen(false)

  const onChangeLanguage = (locale: Locale) => {
    if (locale === currentLocale) return handleClose()

    const selectedLanguage = getLanguageByLocaleValue(locale)

    if (selectedLanguage) {
      startTransition(() => {
        setCurrentLanguage(selectedLanguage)
        router.replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          { pathname: pathname + queryParams, params },
          { locale }
        )
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
