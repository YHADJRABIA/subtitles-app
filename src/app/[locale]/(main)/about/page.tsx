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
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { generateMetadataFn } from '@/lib/datocms/generateMetaDataFn'
import { aboutPageQuery } from '@/gql/queries/aboutPage'

export const generateMetadata = generateMetadataFn({
  query: aboutPageQuery,
  buildQueryVariables: ({ params: { locale } }: MetaDataProps) => ({ locale }),
  pickSeoMetaTags: data => data.aboutPage?._seoMetaTags,
})

const ICON_MAP = {
  MonitorIcon: PiMonitorPlayThin,
  TipJarIcon: PiTipJarThin,
  TranslateIcon: PiTranslateThin,
}
type IconKeys = keyof typeof ICON_MAP

export default async function AboutPage({ params: { locale } }: MetaDataProps) {
  const { isEnabled: isDraftModeEnabled } = await draftMode()

  const { aboutPage } = await executeQuery(aboutPageQuery, {
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
      <Typography className={styles.title} tag="h1" weight="bold">
        {title}
      </Typography>

      <Row className={styles.highlights} Tag="section">
        {highlights.block.map((item, idx) => {
          const icon = ICON_MAP[item.icon as IconKeys]
          return (
            <Col key={idx} width={[12, 6, 4]}>
              <TextWithIcon
                description={item.description}
                icon={icon}
                title={item.title}
              />
            </Col>
          )
        })}
      </Row>

      {faq && (
        <section>
          <Typography className={styles.title} tag="h2" weight="bold">
            {faq.title}
          </Typography>

          {faqItems?.length && (
            <Accordion
              expandMultiple
              hasBackgroundEffect
              backgroundColor="var(--primary-gray-color)"
              items={faqItems}
            />
          )}
        </section>
      )}
    </div>
  )
}
