import { capitaliseFirstLetter, isNonRelativeUrl } from '../string'

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
