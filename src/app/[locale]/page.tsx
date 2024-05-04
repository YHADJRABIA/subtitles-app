import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('Index')
  return <p>{t('title')}</p>
}
