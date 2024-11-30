import { v4 as uuidv4 } from 'uuid'
import { generateNDigitCode, generateUUIDToken, hashPassword } from '../random'

import bcryptjs from 'bcryptjs'

jest.mock('uuid', () => ({ v4: jest.fn() }))
jest.mock('bcryptjs')

describe('generateUUIDToken', () => {
  const mockUuid = 'mock-uuid-1234'
  const mockedUUID = uuidv4 as jest.Mock

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

describe('hashPassword', () => {
  const mockPassword = 'securePassword123'
  const mockRounds = 12
  const mockSalt = 'mockSalt123'
  const mockHashedPassword = 'mockHashedPassword123'

  const mockGenSalt = bcryptjs.genSalt as jest.Mock
  const mockHash = bcryptjs.hash as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    mockGenSalt.mockResolvedValue(mockSalt)
    mockHash.mockResolvedValue(mockHashedPassword)
  })

  it('should hash the password with the default number of rounds', async () => {
    const hashedPassword = await hashPassword(mockPassword)

    expect(bcryptjs.genSalt).toHaveBeenCalledWith(10) // 10 rounds
    expect(bcryptjs.hash).toHaveBeenCalledWith(mockPassword, mockSalt)
    expect(hashedPassword).toBe(mockHashedPassword)
  })

  it('should hash the password with a custom number of rounds', async () => {
    const hashedPassword = await hashPassword(mockPassword, mockRounds)

    expect(bcryptjs.genSalt).toHaveBeenCalledWith(mockRounds)
    expect(bcryptjs.hash).toHaveBeenCalledWith(mockPassword, mockSalt)
    expect(hashedPassword).toBe(mockHashedPassword)
  })

  it('should throw an error if bcryptjs.genSalt fails', async () => {
    mockGenSalt.mockRejectedValue(new Error('Salt generation failed'))

    await expect(hashPassword(mockPassword)).rejects.toThrow(
      'Salt generation failed'
    )
  })

  it('should throw an error if bcryptjs.hash fails', async () => {
    mockHash.mockRejectedValue(new Error('Hashing failed'))

    await expect(hashPassword(mockPassword)).rejects.toThrow('Hashing failed')
  })
})

describe('generateNDigitCode', () => {
  it('should generate a 4-digit code with default expiration', () => {
    const { code, expirationDate } = generateNDigitCode()

    expect(code).toMatch(/^\d{4}$/) // Matches a 4-digit code
    const expectedExpiration = new Date().getTime() + 1000 * 3600 * 1 // 1 hour
    expect(expirationDate).toBeGreaterThanOrEqual(expectedExpiration - 5)
    expect(expirationDate).toBeLessThanOrEqual(expectedExpiration + 5)
  })

  it('should generate a 6-digit code with custom expiration', () => {
    const validHours = 3
    const n = 6

    const { code, expirationDate } = generateNDigitCode(validHours, n)

    expect(code).toMatch(/^\d{6}$/) // Matches a 6-digit code
    const expectedExpiration = new Date().getTime() + 1000 * 3600 * validHours
    expect(expirationDate).toBeGreaterThanOrEqual(expectedExpiration - 5)
    expect(expirationDate).toBeLessThanOrEqual(expectedExpiration + 5)
  })

  it('should generate a 5-digit code', () => {
    const { code } = generateNDigitCode(1, 5)
    expect(code).toMatch(/^\d{5}$/) // Matches a 5-digit code
  })

  it('should generate a 7-digit code', () => {
    const { code } = generateNDigitCode(1, 7)
    expect(code).toMatch(/^\d{7}$/) // Matches a 7-digit code
  })

  it('should generate a 8-digit code', () => {
    const { code } = generateNDigitCode(1, 8)
    expect(code).toMatch(/^\d{8}$/) // Matches a 8-digit code
  })
})
