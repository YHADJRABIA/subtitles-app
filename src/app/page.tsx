import { defaultLocale, redirect } from '@/lib/i18n/navigation'

// Redirect '/' to '/(default-locale)'
const IndexPage = () => {
  redirect(`/${defaultLocale}`)
}

export default IndexPage
