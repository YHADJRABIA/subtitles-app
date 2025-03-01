import { IntlMessagesKey } from '@/types/global'
import { Locale } from '@/types/locale'
import { createTranslator } from 'next-intl'

let messages = {}

export const getTranslation = async (
  namespace: string,
  key: string
): Promise<string> => {
  const locale = 'en' // TODO fetch correctly

  if (Object.keys(messages).length === 0) {
    messages = (await import(`../../../messages/${locale}.json`)).default
  }

  // Create translator with the loaded messages and namespace
  const t = createTranslator({ locale, messages, namespace } as {
    locale: Locale
    messages: IntlMessagesKey
    namespace: IntlMessagesKey
  })

  // Return the translated key
  return t(key as IntlMessagesKey)
}
