import { type FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql'
import { type ImagePropTypes, SRCImage } from 'react-datocms'
import styles from './ResponsiveImage.module.scss'
import cn from 'classnames'

export const ResponsiveImageFragment = graphql(`
  fragment ResponsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    base64
  }
`)

type Props = Omit<ImagePropTypes, 'data'> & {
  data: FragmentOf<typeof ResponsiveImageFragment>
  hasRoundedBorder?: boolean
}

/**
 * This component is a wrapper for the `<SRCImage />` component provided by
 * react-datocms, optimized for use with graphql.tada. We define the necessary
 * GraphQL fragment for this component to function only once, then reuse it
 * wherever needed.
 */
export default function ResponsiveImage({
  data,
  hasRoundedBorder,
  ...other
}: Props) {
  const unmaskedData = readFragment(ResponsiveImageFragment, data)

  return (
    <SRCImage
      usePlaceholder
      data={unmaskedData}
      imgClassName={cn({
        [styles.roundedBorder]: hasRoundedBorder,
      })}
      imgStyle={{ maxWidth: '100%' }}
      {...other}
    />
  )
}
