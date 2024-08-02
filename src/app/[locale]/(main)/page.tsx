import HeroBanner from '@/components/UI/HeroBanner'
import styles from './page.module.scss'
import { useTranslations } from 'next-intl'
import CtaSection from './_components/CtaSection'
import { getNextLocale } from '@/utils/cookies'
import { getTranslations } from 'next-intl/server'

const MAIN_ASSET_PATH = '/assets/film-rolls.svg'

export const generateMetadata = async () => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('Homepage.title')}`,
    description: t('Homepage.description'),
  }
}

export default function HomePage() {
  const t = useTranslations('Index')

  return (
    <div className={styles.root}>
      <HeroBanner
        image={MAIN_ASSET_PATH}
        imageAlt={t('HeroBanner.image_alt')}
        title={t('HeroBanner.heading')}
        description={t('HeroBanner.description')}
        ctaElements={<CtaSection />}
      />
    </div>
  )
}
