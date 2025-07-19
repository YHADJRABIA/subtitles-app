import { Metadata } from 'next/types'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { MetaDataProps } from '../layout'

export const generateMetadata = async ({
  params,
}: MetaDataProps): Promise<Metadata> => {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: 'Metadata.NotFound',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

// Invoke 404 page for all non-matching paths inside of [locale] folder
export default function CatchAllPage() {
  notFound()
}
