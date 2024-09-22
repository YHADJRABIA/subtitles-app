import { defaultLocale } from '@/lib/i18n/navigation'
import { redirect } from 'next/navigation' // Shouldn't call Next-Intl's redirect here (outisde of /[locale]/ folder). Fails build otherwise

// Redirect '/' to '/(default-locale)'
const IndexPage = () => {
  redirect(`/${defaultLocale}`)
}

export default IndexPage
