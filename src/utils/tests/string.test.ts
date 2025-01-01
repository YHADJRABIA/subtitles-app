import {
  capitaliseFirstLetter,
  isNonRelativeUrl,
  truncateEmail,
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

describe('truncateEmail', () => {
  it('should return the email as is if its length is less than or equal to maxLength', () => {
    const email = 'user@example.com'
    const maxLength = 20
    expect(truncateEmail(email, maxLength)).toBe(email)
  })

  it('should return the email as is if the local part and domain fit within maxLength', () => {
    const email = 'short@domain.com'
    const maxLength = 20
    expect(truncateEmail(email, maxLength)).toBe(email)
  })

  it('should truncate the local part and preserve the domain', () => {
    const email = 'averylonglocalpart@domain.com'
    const maxLength = 20
    expect(truncateEmail(email, maxLength)).toBe('averylong...@domain.com')
  })

  it('should handle edge case where domain is very long and local part is very short', () => {
    const email = 'a@averylongdomain.com' // Local part is just 1 character, but domain is long
    const maxLength = 30 // Ensure maxLength is large enough to fit both the domain and local part
    expect(truncateEmail(email, maxLength)).toBe('a@averylongdomain.com')
  })

  it('should return the email as is if the email has no domain part', () => {
    const email = 'invalidemail'
    const maxLength = 20
    expect(truncateEmail(email, maxLength)).toBe(email)
  })

  it('should truncate the local part correctly when the email is valid but needs truncation', () => {
    const email = 'verylonglocalpartwithnochange@domain.com'
    const maxLength = 30
    expect(truncateEmail(email, maxLength)).toBe(
      'verylonglocalpartwi...@domain.com'
    )
  })

  it('should handle edge case where domain is very long and local part is very short', () => {
    const email = 'a@averylongdomain.com'
    const maxLength = 20
    expect(truncateEmail(email, maxLength)).toBe('a...@averylongdomain.com')
  })

  it('should return email as is when maxLength is large enough to fit both local part and domain', () => {
    const email = 'user@domain.com'
    const maxLength = 50
    expect(truncateEmail(email, maxLength)).toBe(email)
  })
})
