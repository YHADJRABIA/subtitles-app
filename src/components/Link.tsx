import { useTranslatePathname } from '@/hooks/useTranslatePathname'
import { useLocale } from 'next-intl'
import NextLink, { LinkProps } from 'next/link'
import { HTMLProps } from 'react'

/**
 * Improved version of Next's Link with added default `as` prop.
 * Improves UX by showing href under its translated pathname according to next-intl routes mapping
 **/
export const Link = ({
  href,
  children,
  ...rest
}: LinkProps & HTMLProps<HTMLAnchorElement>) => {
  const locale = useLocale()
  const translatedPathname = useTranslatePathname({ href })

  return (
    <NextLink {...rest} href={href} lang={locale} as={translatedPathname}>
      {children}
    </NextLink>
  )
}

export default Link
