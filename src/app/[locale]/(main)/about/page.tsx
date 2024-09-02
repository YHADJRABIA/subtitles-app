import Typography from '@/components/UI/Typography'
import styles from './page.module.scss'
import Accordion from '@/components/Accordion'
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
import { generateMetadataFn } from '@/lib/datocms/generateMetaDataFn'
import { TagFragment } from '@/lib/datocms/commonFragments'

const query = graphql(
  `
    query AboutPageQuery($locale: SiteLocale) {
      aboutPage(locale: $locale, fallbackLocales: en) {
        _seoMetaTags {
          ...TagFragment
        }

        title

        faq {
          title
          content {
            question
            answer
          }
        }

        highlights {
          title
          block {
            title
            description
            icon
          }
        }
      }
    }
  `,
  [TagFragment]
)

export const generateMetadata = generateMetadataFn({
  query,
  buildQueryVariables: ({ params: { locale } }: MetaDataProps) => ({ locale }),
  pickSeoMetaTags: data => data.aboutPage?._seoMetaTags,
})

const iconMap = {
  // TODO: relocate somewhere better
  MonitorIcon: PiMonitorPlayThin,
  TipJarIcon: PiTipJarThin,
  TranslateIcon: PiTranslateThin,
}

export default async function AboutPage({ params: { locale } }: MetaDataProps) {
  const { isEnabled: isDraftModeEnabled } = draftMode()

  const { aboutPage } = await executeQuery(query, {
    variables: { locale },
    includeDrafts: isDraftModeEnabled,
  })

  if (!aboutPage) {
    notFound()
  }

  const { title, faq, highlights } = aboutPage

  const faqItems = faq?.content.map(({ question, answer }) => ({
    title: question,
    body: answer,
  }))

  return (
    <div className={styles.root}>
      <Typography tag="h1" weight="bold" className={styles.title}>
        {title}
      </Typography>

      <Row className={styles.highlights} Tag="section">
        {highlights.block.map((item, idx) => {
          const icon = iconMap[item.icon]
          return (
            <Col key={idx} width={[12, 6, 4]}>
              <TextWithIcon
                title={item.title}
                description={item.description}
                icon={icon}
              />
            </Col>
          )
        })}
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
