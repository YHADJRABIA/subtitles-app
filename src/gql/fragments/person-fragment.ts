import { graphql } from '@/lib/datocms/graphql'

export const PersonFragment = graphql(`
  fragment PersonFragment on PersonRecord @_unmask {
    name
  }
`)
