import React from 'react'
import Header from '@/components/Layout/Header/index'
import Footer from '@/components/Layout/Footer'
import { getUserSession } from '@/utils/session'
import HeroBanner from '@/components/HeroBanner'
import styles from './not-found.module.scss'
import Typography from '@/components/UI/Typography'
import { LinkButton } from '@/components/UI/Button/LinkButton'
import { MdOutlineKeyboardBackspace as BackIcon } from 'react-icons/md'
import { useTranslations } from 'next-intl'

const SVG_PATH = '/assets/ice-fishing.svg'

const NotFoundPage = () => {
  const t = useTranslations('NotFound')
  const user = getUserSession()

  return (
    <>
      <Header isConnected={!!user} />
      <main className={styles.root}>
        <HeroBanner
          ctaElements={
            <LinkButton
              className={styles.cta}
              icon={{ src: BackIcon, size: 22 }}
              link={{ href: '/' }}
              size="s"
              variation="primary"
              weight="semiBold"
            >
              {t('back_to_homepage')}
            </LinkButton>
          }
          description={t('verify_route')}
          image={SVG_PATH}
          imageAlt="404"
          imageAspectRatio="1/1"
          title={t('page_not_found')}
        />
      </main>
      <Typography
        className={styles.credits}
        color="var(--primary-blue-color)"
        link={{ href: 'https://storyset.com/', openInNewTab: true }}
        size="s"
      >
        {t('storyset_credit')}
      </Typography>
      <Footer />
    </>
  )
}

export default NotFoundPage
