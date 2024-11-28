import { v4 as uuidv4 } from 'uuid'
import { generateUUIDToken } from '../random'

const mockUuid = 'mock-uuid-1234'
jest.mock('uuid', () => ({ v4: jest.fn() }))

const mockedUUID = uuidv4 as jest.Mock

describe('generateUUIDToken', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedUUID.mockReturnValue(mockUuid)
  })

  it('should generate a token and expiration date with default validHours', () => {
    const { token, expirationDate } = generateUUIDToken()

    expect(token).toBe(mockUuid)
    const expectedExpiration = new Date().getTime() + 1000 * 3600 * 1 // 1 hour
    expect(expirationDate).toBeGreaterThanOrEqual(expectedExpiration - 5) // Allow minimal timing discrepancies
    expect(expirationDate).toBeLessThanOrEqual(expectedExpiration + 5)
  })

  it('should generate a token and expiration date for custom validHours', () => {
    const validHours = 2

    const { token, expirationDate } = generateUUIDToken(validHours)

    expect(token).toBe(mockUuid)
    const expectedExpiration = new Date().getTime() + 1000 * 3600 * validHours
    expect(expirationDate).toBeGreaterThanOrEqual(expectedExpiration - 5)
    expect(expirationDate).toBeLessThanOrEqual(expectedExpiration + 5)
  })

  it('should throw an error if validHours is less than or equal to 0', () => {
    expect(() => generateUUIDToken(0)).toThrow(
      'Token expiration must be positive'
    )
    expect(() => generateUUIDToken(-5)).toThrow(
      'Token expiration must be positive'
    )
  })

  it('should call uuidv4 exactly once', () => {
    generateUUIDToken()
    expect(uuidv4).toHaveBeenCalledTimes(1)
  })
})
