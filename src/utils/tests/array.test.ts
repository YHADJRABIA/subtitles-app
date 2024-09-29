import { ArrayToString } from '../array'

describe('ArrayToString', () => {
  it('should join an array of strings with ", "', () => {
    const input = ['First', 'Second', 'Third']
    const result = ArrayToString(input)
    expect(result).toBe('First, Second, Third')
  })

  it('should return an empty string when the array is empty', () => {
    const input: string[] = []
    const result = ArrayToString(input)
    expect(result).toBe('')
  })

  it('should handle an array with one string', () => {
    const input = ['OnlyOne']
    const result = ArrayToString(input)
    expect(result).toBe('OnlyOne')
  })

  it('should return an empty string when the array contains only empty strings or spaces', () => {
    const input = ['', ' ', '  ']
    const result = ArrayToString(input)
    expect(result).toBe('') // Expect an empty string, since all elements are considered "empty"
  })

  it('should handle an array with mixed empty and non-empty strings', () => {
    const input = ['First', '', ' ', 'Third', '  ']
    const result = ArrayToString(input)
    expect(result).toBe('First, Third') // Ignore empty strings and strings with spaces only
  })

  it('should ignore strings with only whitespace and keep non-empty strings', () => {
    const input = ['   ', 'Hello', '', '  ', 'World']
    const result = ArrayToString(input)
    expect(result).toBe('Hello, World') // Ignore strings that have only spaces
  })
})
