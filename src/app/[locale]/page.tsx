import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('Index')
  return (
    <main>
      <p>{t('title')}</p>
    </main>
  )
}
