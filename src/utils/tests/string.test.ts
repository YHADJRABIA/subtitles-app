import {
  capitaliseFirstLetter,
  isNonRelativeUrl,
  shortenEmail,
} from '../string'

describe('capitaliseFirstLetter', () => {
  it('should capitalise the first letter of a string', () => {
    const input = 'hello'
    const output = capitaliseFirstLetter(input)
    expect(output).toBe('Hello')
  })

  it('should return the same string if the first letter is already capitalised', () => {
    const input = 'Hello'
    const output = capitaliseFirstLetter(input)
    expect(output).toBe('Hello')
  })

  it('should return an empty string if input is empty', () => {
    const input = ''
    const output = capitaliseFirstLetter(input)
    expect(output).toBe('')
  })

  it('should return the same string if it contains only one character', () => {
    const input = 'a'
    const output = capitaliseFirstLetter(input)
    expect(output).toBe('A')
  })

  it('should handle strings with special characters correctly', () => {
    const input = '1example'
    const output = capitaliseFirstLetter(input)
    expect(output).toBe('1example')
  })

  it('should handle strings with whitespace at the beginning correctly', () => {
    const input = ' hello'
    const output = capitaliseFirstLetter(input)
    expect(output).toBe(' hello')
  })
})

describe('isNonRelativeUrl', () => {
  it('should return true for a valid http URL', () => {
    const url = 'http://example.com'
    expect(isNonRelativeUrl(url)).toBe(true)
  })

  it('should return true for a valid https URL', () => {
    const url = 'https://example.com'
    expect(isNonRelativeUrl(url)).toBe(true)
  })

  it('should return false for a relative URL', () => {
    const url = '/home'
    expect(isNonRelativeUrl(url)).toBe(false)
  })

  it('should return false for a URL without protocol', () => {
    const url = 'example.com'
    expect(isNonRelativeUrl(url)).toBe(false)
  })

  it('should return false for a URL with other protocols (e.g., ftp)', () => {
    const url = 'ftp://example.com'
    expect(isNonRelativeUrl(url)).toBe(false)
  })

  it('should return false for an empty string', () => {
    const url = ''
    expect(isNonRelativeUrl(url)).toBe(false)
  })

  it('should return false for a URL starting with a space', () => {
    const url = ' https://example.com'
    expect(isNonRelativeUrl(url)).toBe(false)
  })
})

describe('shortenEmail', () => {
  test('should return the full email if within the character limit', () => {
    expect(shortenEmail('user@domain.com', 20)).toBe('user@domain.com')
  })

  test('should shorten email with "..." when exceeding limit', () => {
    expect(shortenEmail('exampleemail@domain.com', 10)).toBe('e...@domain.com')
  })

  test('should handle very small charLimit and keep a visible part', () => {
    expect(shortenEmail('exampleemail@domain.com', 5)).toBe('e...@domain.com')
    expect(shortenEmail('exampleemail@domain.com', 4)).toBe('e...d')
  })

  test('should shorten only the name part', () => {
    expect(shortenEmail('longname@domain.com', 12)).toBe('lon...@domain.com')
  })

  test('should handle email without "@" gracefully', () => {
    expect(shortenEmail('justastringwithoutat', 10)).toBe('justas...')
  })

  test('should handle edge cases with very small charLimit', () => {
    expect(shortenEmail('example@domain.com', 3)).toBe('e...')
  })

  test('should return "..." for unreasonably small limits', () => {
    expect(shortenEmail('example@domain.com', 1)).toBe('...')
  })

  test('should handle emails that are exactly at the limit', () => {
    expect(shortenEmail('example@domain.com', 17)).toBe('example@domain.com')
  })
})
