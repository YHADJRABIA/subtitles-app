import HeroBanner from '@/components/UI/HeroBanner'
import styles from './page.module.scss'
import { useTranslations } from 'next-intl'
import CtaSection from './_components/CtaSection'

const MAIN_ASSET_PATH = '/assets/film-rolls.svg'

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
        className={styles.heroBanner}
      />
    </div>
  )
}
