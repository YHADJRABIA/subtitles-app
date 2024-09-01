import Typography from '@/components/UI/Typography'
import styles from './page.module.scss'
import { useTranslations } from 'next-intl'
import Accordion from '@/components/Accordion'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import TextWithIcon from '@/components/UI/ItemsList/TextWithIcon'
import {
  PiTranslateThin,
  PiMonitorPlayThin,
  PiTipJarThin,
} from 'react-icons/pi'
import { Col, Row } from '@/components/UI/Grid'
import { MetaDataProps } from '../../layout'
import { executeQuery } from '@/lib/datocms/executeQuery'
import { graphql } from '@/lib/datocms/graphql'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({
  params: { locale },
}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: `${t('prefix')} ${t('About.title')}`,
    description: t('About.description'),
  }
}

/**
 * The GraphQL query that will be executed for this route to generate the page
 * content and metadata.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
const getAboutPage = graphql(`
  query AboutPageQuery($locale: SiteLocale) {
    aboutPage {
      title(locale: $locale, fallbackLocales: en)
      faq(locale: $locale, fallbackLocales: en) {
        title
        content {
          question
          answer
        }
      }
    }
  }
`)

export default async function AboutPage({ params: { locale } }: MetaDataProps) {
  const t = await getTranslations({ locale, namespace: 'About' })
  const { isEnabled: isDraftModeEnabled } = draftMode()

  const { aboutPage } = await executeQuery(getAboutPage, {
    variables: { locale },
    includeDrafts: isDraftModeEnabled,
  })

  if (!aboutPage) {
    notFound()
  }

  const { title, faq } = aboutPage

  const faqItems = faq?.content.map(({ question, answer }) => ({
    title: question,
    body: answer,
  }))

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
        {title}
      </Typography>

      <Row className={styles.highlights} Tag="section">
        {highlights.map((item, idx) => (
          <Col key={idx} width={[12, 6, 4]}>
            <TextWithIcon
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          </Col>
        ))}
      </Row>

      <section>
        <Typography tag="h2" weight="bold" className={styles.title}>
          {faq.title}
        </Typography>
        <Accordion
          items={faqItems}
          backgroundColor="var(--primary-gray-color)"
          expandMultiple
          hasBackgroundEffect
        />
      </section>
    </div>
  )
}
