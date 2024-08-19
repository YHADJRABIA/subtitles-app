/*
 * We use gql.tada to automatically generate TypeScript types from the GraphQL
 * schema. This module customizes the default behavior of gql.tada to match the
 * DatoCMS schema of the project.
 *
 * For more information:
 * - https://gql-tada.0no.co/
 */

import { initGraphQLTada } from 'gql.tada'

import type { introspection } from '@/types/graphql-env'

/**
 * The Content Delivery API exposes a number of custom GraphQL scalar types. For
 * each one, we must manually define an appropriate TypeScript type mapping.
 *
 * https://www.datocms.com/docs/content-delivery-api/custom-scalar-types
 */

export const graphql = initGraphQLTada<{
  introspection: introspection
  scalars: {
    BooleanType: boolean
    CustomData: Record<string, string>
    Date: string
    DateTime: string
    FloatType: number
    IntType: number
    ItemId: string
    JsonField: unknown
    MetaTagAttributes: Record<string, string>
    UploadId: string
  }
}>()

// eslint-disable-next-line no-duplicate-imports
export {
  readFragment,
  type FragmentOf,
  type ResultOf,
  type VariablesOf,
} from 'gql.tada'
