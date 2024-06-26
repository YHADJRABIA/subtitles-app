import { usePathname } from 'next/navigation'
import { useGetQueryParams } from './useGetQueryParams'
import { removeLocalePrefixFromPathname } from '@/utils/internationalisation/paths'

/**
 * Extracts pathname from "/locale/pathname..." with or without queryparams.
 * @param {boolean} hasSearchParams  Determines if search parameters should be included in the returned pathname.
 * @returns Pathname without locale prefix.
 */

export const useDelocalisedPathname = (hasSearchParams: boolean = true) => {
  const pathname = usePathname()
  const queryParams = useGetQueryParams()
  const sanitisedPathname = removeLocalePrefixFromPathname(pathname)

  const searchParams = hasSearchParams ? queryParams : ''

  const delocalisedPathName = `${sanitisedPathname}${searchParams}`

  return delocalisedPathName
}
