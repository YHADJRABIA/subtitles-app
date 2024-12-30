import { locales } from '@/i18n/routing'
import { removeLocalePrefixFromPathname } from '../internationalisation/paths'
import { hasMatchingFirstSlug } from '../paths'
import { Pathname } from '@/types/pathnames'

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

// disale typescript eslint rule for the following test
describe('hasMatchingFirstSlug', () => {
  test('returns false when either path is empty', () => {
    expect(hasMatchingFirstSlug('' as Pathname, '/example')).toBe(false)
    expect(hasMatchingFirstSlug('/example' as Pathname, '')).toBe(false)
    expect(hasMatchingFirstSlug('' as Pathname, '')).toBe(false)
  })

  test('returns true when both paths are "/"', () => {
    expect(hasMatchingFirstSlug('/', '/')).toBe(true)
  })

  test('returns false when one path is "/" and the other is not', () => {
    expect(hasMatchingFirstSlug('/', '/example')).toBe(false)
    expect(hasMatchingFirstSlug('/example' as Pathname, '/')).toBe(false)
  })

  test('returns true when the first segment of both paths match', () => {
    expect(
      hasMatchingFirstSlug('/example/path' as Pathname, '/example/another')
    ).toBe(true)
    expect(hasMatchingFirstSlug('/example' as Pathname, '/example')).toBe(true)
    expect(
      hasMatchingFirstSlug('/example/' as Pathname, '/example/another')
    ).toBe(true)
  })

  test('returns false when the first segment of both paths do not match', () => {
    expect(
      hasMatchingFirstSlug('/first/path' as Pathname, '/second/path')
    ).toBe(false)
    expect(hasMatchingFirstSlug('/first' as Pathname, '/second')).toBe(false)
  })

  test('is case-sensitive by default', () => {
    expect(hasMatchingFirstSlug('/Example' as Pathname, '/example')).toBe(false)
  })
})
