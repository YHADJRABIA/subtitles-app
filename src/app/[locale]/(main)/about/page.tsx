import Typography from '@/components/UI/Typography'
import styles from './page.module.scss'
import { useTranslations } from 'next-intl'
import Accordion from '@/components/Accordion'
import { getNextLocale } from '@/utils/cookies'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import TextWithIcon from '@/components/UI/ItemsList/TextWithIcon'
import {
  PiTranslateThin,
  PiMonitorPlayThin,
  PiTipJarThin,
} from 'react-icons/pi'
import { Col, Row } from '@/components/UI/Grid'

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = getNextLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('About.title')}`,
    description: t('About.description'),
  }
}

export default function AboutPage() {
  const t = useTranslations('About')

  // TODO: Fetch from CMS instead
  const faq = [
    {
      title: t('FAQ.is_it_free'),
      body: t('FAQ.entirely_free'),
    },
    {
      title: t('FAQ.how_do_you_support_yourself'),
      body: t('FAQ.from_donations'),
    },

    {
      title: t('FAQ.what_motivates_you'),
      body: t('FAQ.motivation_for_subtitles'),
    },

    {
      title: t('FAQ.are_you_a_professional_translator'),
      body: t('FAQ.part_time_translator'),
    },

    {
      title: t('FAQ.where_do_you_find_series'),
      body: t('FAQ.series_found'),
    },

    {
      title: t('FAQ.are_subtitles_exclusive'),
      body: t('FAQ.exclusive_subtitles'),
    },

    {
      title: t('FAQ.how_to_read_subtitles'),
      body: t('FAQ.use_software'),
    },

    {
      title: t('FAQ.how_long_for_episode'),
      body: t('FAQ.a_whole_day'),
    },

    {
      title: t('FAQ.where_to_get_series'),
      body: t('FAQ.from_free_websites'),
    },
  ]

  const highlights = [
    {
      title: t('Highlights.discover_new_series'),
      description: t('Highlights.not_mainstream'),
      icon: PiMonitorPlayThin,
    },
    {
      title: t('Highlights.entirely_free'),
      description: t('Highlights.donate_if_you_like'),
      icon: PiTipJarThin,
    },
    {
      title: t('Highlights.learn_about_cultures'),
      description: t('Highlights.ex_ussr'),
      icon: PiTranslateThin,
    },
  ]

  return (
    <div className={styles.root}>
      <Typography tag="h1" weight="bold" className={styles.title}>
        {t('title')}
      </Typography>

      <section className={styles.highlights}>
        <Row>
          {highlights.map((item, idx) => (
            <Col key={idx} width={[12, 6, 4]}>
              <TextWithIcon
                title={item.title}
                description={item.description}
                icon={item.icon}
                className={styles.textWithIcon}
              />
            </Col>
          ))}
        </Row>
      </section>

      <section>
        <Typography
          tag="h2"
          weight="bold"
          align="left"
          className={styles.title}
        >
          {t('FAQ.title')}
        </Typography>
        <Accordion items={faq} expandMultiple />
      </section>
    </div>
  )
}
