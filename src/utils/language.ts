import { Locale } from '@/types/locale'
import FrFlagIcon from '../../public/flags/fr.svg?url'
import UkFlagIcon from '../../public/flags/uk.svg?url'

interface Language {
  id: Locale
  value: Locale
  label: string
  icon: string
}

export const languages: Language[] = [
  { id: 'en', value: 'en', label: 'English', icon: UkFlagIcon },
  { id: 'fr', value: 'fr', label: 'Français', icon: FrFlagIcon },
]

export const defaultLanguage = languages[0]

export const getLanguageByLocaleValue = (locale: Locale) => {
  return languages.find(lang => lang.value === locale) as Language
}
