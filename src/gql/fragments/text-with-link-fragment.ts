import { graphql } from '@/lib/datocms/graphql'

export const TextWithLinkFragment = graphql(`
  fragment TextWithLinkFragment on TextWithLinkRecord @_unmask {
    label
    href
  }
`)
