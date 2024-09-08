import { aboutPageQuery } from '@/gql/queries/aboutPage'
import { allSeriesQuery } from '@/gql/queries/allSeriesPage'
import { executeQuery } from '@/lib/datocms/executeQuery'
import { pathnames } from '@/lib/i18n/navigation'
import { websiteUrl } from '@/utils/general'
import { languages } from '@/utils/internationalisation/language'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { allSeries } = await executeQuery(allSeriesQuery)
  const { aboutPage } = await executeQuery(aboutPageQuery)

  const seriesRoutes = allSeries.map(series => {
    const { slug } = series
    return {
      url: `${websiteUrl}/series/${slug}`,
      lastModified: series.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
      /* alternates: {
        languages: {
          fr: `${websiteUrl}/fr/${pathnames['/series'].fr}/${slug}`,
        },
      },*/
    }
  })

  const staticRoutes = [
    {
      url: `${websiteUrl}`,
      lastModified: '2024-08-07T15:45:15+02:00', // TODO: Update when homepage is fetched from CMS
      changeFrequency: 'monthly',
      priority: 1,
      /*  alternates: {
        languages: {
          fr: `${websiteUrl}/fr`,
        },
      }, */
    },
    {
      url: `${websiteUrl}${pathnames['/about'].en}`,
      lastModified: aboutPage?.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.5,
      /*   alternates: {
        languages: {
          fr: `${websiteUrl}/fr/${pathnames['/about'].fr}`,
        },
      }, */
    },
    {
      url: `${websiteUrl}${pathnames['/series'].en}`,
      lastModified: allSeries[0].updatedAt, // TODO: Update when there are more series
      changeFrequency: 'monthly',
      priority: 0.8,
      /*       alternates: {
        languages: {
          fr: `${websiteUrl}/fr/${pathnames['/series'].fr}`,
        },
      }, */
    },
  ]

  return [...staticRoutes, ...seriesRoutes] as MetadataRoute.Sitemap
}
