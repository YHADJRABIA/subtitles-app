import HeroBanner from '@/components/HeroBanner'
import styles from './page.module.scss'
import { useTranslations } from 'next-intl'
import CtaSection from './_components/CtaSection'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { MetaDataProps } from '../layout'

const MAIN_ASSET_PATH = '/assets/film-rolls.svg'

// TODO: Complete SEO fields
export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata.Homepage' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function HomePage() {
  const t = useTranslations('Index')

  return (
    <div className={styles.root}>
      <HeroBanner
        imageAspectRatio="1/1"
        image={MAIN_ASSET_PATH}
        className={styles.heroBanner}
        imageAlt={t('HeroBanner.image_alt')}
        title={t('HeroBanner.heading')}
        description={t('HeroBanner.description')}
        ctaElements={<CtaSection />}
      />
    </div>
  )
}
