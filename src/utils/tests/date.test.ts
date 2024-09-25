import { formatDate, getCurrentYear, hasExpired } from '../date'

// Set the environment timezone to 'UTC' to ensure consistent test results
const originalTimeZone = process.env.TZ

beforeAll(() => {
  process.env.TZ = 'UTC'
})

afterAll(() => {
  process.env.TZ = originalTimeZone
})

describe('Date utility functions', () => {
  describe('getCurrentYear', () => {
    it('should return the current year', () => {
      const currentYear = new Date().getFullYear()
      expect(getCurrentYear()).toBe(currentYear)
    })
  })

  describe('hasExpired', () => {
    it('should return true if date is passed', () => {
      const pastDate = new Date(2000, 0, 1)
      expect(hasExpired(pastDate)).toBe(true)
    })

    it('should return false if future date', () => {
      const futureDate = new Date(3000, 0, 1)
      expect(hasExpired(futureDate)).toBe(false)
    })

    it('should return false if date is today', () => {
      const today = new Date()
      expect(hasExpired(today)).toBe(false)
    })
  })

  describe('formatDate', () => {
    it('should format date in default locale and without time', () => {
      const isoDateString = '2022-12-31T10:00:00Z'
      const result = formatDate(isoDateString)
      expect(result).toBe('31/12/2022')
    })

    it('should format date with time when showTime is true', () => {
      const isoDateString = '2022-12-31T10:00:00Z'
      const result = formatDate(isoDateString, { showTime: true })
      expect(result).toEqual({ date: '31/12/2022', time: '10:00' })
    })

    it('should format date with a specified locale', () => {
      const isoDateString = '2022-12-31T10:00:00Z'
      const result = formatDate(isoDateString, { locale: 'en' })
      expect(result).toBe('12/31/2022')
    })

    it('should format date with time in a specified locale', () => {
      const isoDateString = '2022-12-31T10:00:00Z'
      const result = formatDate(isoDateString, {
        locale: 'en',
        showTime: true,
      })
      expect(result).toEqual({ date: '12/31/2022', time: '10:00 AM' })
    })

    it('should return "Invalid date" for an invalid ISO date string', () => {
      const invalidIsoDateString = 'invalid-date-string'
      const result = formatDate(invalidIsoDateString)
      expect(result).toBe('Invalid date')
    })
  })
})
