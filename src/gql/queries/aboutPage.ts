import { TagFragment } from '../fragments/commonFragments'
import { graphql } from '@/lib/datocms/graphql'

export const aboutPageQuery = graphql(
  `
    query AboutPageQuery($locale: SiteLocale) {
      aboutPage(locale: $locale, fallbackLocales: en) {
        _seoMetaTags {
          ...TagFragment
        }

        title
        updatedAt: _updatedAt

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
