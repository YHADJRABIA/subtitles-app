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
  it('returns the email as is if the length is within the charLimit', () => {
    expect(shortenEmail('user@example.com', 20)).toBe('user@example.com')
  })

  it('shortens the email with "..." when it exceeds the charLimit', () => {
    expect(shortenEmail('user@example.com', 10)).toBe('u...@example.com')
  })

  it('handles cases where there is no "@" in the email', () => {
    expect(shortenEmail('invalidemail', 10)).toBe('inval...')
  })

  it('handles cases where charLimit is too small to display the domain', () => {
    expect(shortenEmail('user@example.com', 5)).toBe('u...')
  })

  it('handles cases where charLimit is exactly the length of the email', () => {
    expect(shortenEmail('user@example.com', 15)).toBe('user@example.com')
  })

  it('handles cases where charLimit is just enough for "..." but not the domain', () => {
    expect(shortenEmail('user@example.com', 3)).toBe('...')
  })

  it('truncates properly when there is enough room for part of the name and the domain', () => {
    expect(shortenEmail('longusername@example.com', 15)).toBe(
      'longu...@example.com'
    )
  })

  it('handles cases where charLimit is too small for even minimal display', () => {
    expect(shortenEmail('a@b.com', 4)).toBe('a...')
  })

  it('handles cases with very short emails', () => {
    expect(shortenEmail('a@b.com', 6)).toBe('a@b.com')
    expect(shortenEmail('a@b.com', 5)).toBe('a...')
  })

  it('handles edge case where charLimit is zero or negative', () => {
    expect(shortenEmail('user@example.com', 0)).toBe('...')
    expect(shortenEmail('user@example.com', -5)).toBe('...')
  })

  it('handles edge case with an empty string', () => {
    expect(shortenEmail('', 10)).toBe('')
  })
})
