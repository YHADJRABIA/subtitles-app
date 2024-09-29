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

const iconMap = {
  // TODO: relocate somewhere better
  MonitorIcon: PiMonitorPlayThin,
  TipJarIcon: PiTipJarThin,
  TranslateIcon: PiTranslateThin,
}
type IconKeys = keyof typeof iconMap

export default async function AboutPage({ params: { locale } }: MetaDataProps) {
  const { isEnabled: isDraftModeEnabled } = draftMode()

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
      <Typography tag="h1" weight="bold" className={styles.title}>
        {title}
      </Typography>

      <Row className={styles.highlights} Tag="section">
        {highlights.block.map((item, idx) => {
          const icon = iconMap[item.icon as IconKeys]
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

      {faq && (
        <section>
          <Typography tag="h2" weight="bold" className={styles.title}>
            {faq.title}
          </Typography>

          {faqItems?.length && (
            <Accordion
              expandMultiple
              hasBackgroundEffect
              items={faqItems}
              backgroundColor="var(--primary-gray-color)"
            />
          )}
        </section>
      )}
    </div>
  )
}
