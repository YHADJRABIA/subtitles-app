import { locales } from '@/i18n/routing'
import { removeLocalePrefixFromPathname } from '../internationalisation/paths'

describe('removeLocalePrefixFromPathname', () => {
  it('should remove locale prefix from pathname', () => {
    const input = '/fr/test'
    const output = removeLocalePrefixFromPathname(input)
    expect(output).toBe('/test')
  })

  it('should return the same pathname if no locale prefix is present', () => {
    const input = '/test'
    const output = removeLocalePrefixFromPathname(input)
    expect(output).toBe('/test')
  })

  it('should remove locale prefix when pathname is only a locale', () => {
    locales.forEach(locale => {
      const input = `/${locale}`
      const output = removeLocalePrefixFromPathname(input)
      expect(output).toBe('')
    })
  })

  it('should return an empty string if the input is only a locale prefix followed by a slash', () => {
    locales.forEach(locale => {
      const input = `/${locale}/`
      const output = removeLocalePrefixFromPathname(input)
      expect(output).toBe('/')
    })
  })

  it('should handle nested paths with locale prefix', () => {
    const input = '/fr/test/nested'
    const output = removeLocalePrefixFromPathname(input)
    expect(output).toBe('/test/nested')
  })

  it('should not modify pathname if locale is part of the path but not as prefix', () => {
    const input = '/test/fr/path'
    const output = removeLocalePrefixFromPathname(input)
    expect(output).toBe('/test/fr/path')
  })

  it('should return the original input if pathname is empty', () => {
    const input = ''
    const output = removeLocalePrefixFromPathname(input)
    expect(output).toBe('')
  })

  it('should return root slash if the input is just a slash', () => {
    const input = '/'
    const output = removeLocalePrefixFromPathname(input)
    expect(output).toBe('/')
  })

  it('should handle locale prefix at the root without a trailing slash', () => {
    locales.forEach(locale => {
      const input = `/${locale}`
      const output = removeLocalePrefixFromPathname(input)
      expect(output).toBe('')
    })
  })

  it('should handle locale prefix at the root with a trailing slash', () => {
    locales.forEach(locale => {
      const input = `/${locale}/`
      const output = removeLocalePrefixFromPathname(input)
      expect(output).toBe('/')
    })
  })
})
