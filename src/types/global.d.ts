import en from '../../messages/en.json'
import { MessageKeys } from 'next-intl'

type Messages = typeof en

export type IntlMessagesKey = MessageKeys<Messages, keyof Messages>

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
