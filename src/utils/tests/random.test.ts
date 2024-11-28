import { v4 as uuidv4 } from 'uuid'
import { generateUUIDToken, hashPassword } from '../random'

import bcryptjs from 'bcryptjs'

const mockUuid = 'mock-uuid-1234'
jest.mock('uuid', () => ({ v4: jest.fn() }))
jest.mock('bcryptjs')

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

describe('hashPassword', () => {
  const mockPassword = 'securePassword123'
  const mockRounds = 12
  const mockSalt = 'mockSalt123'
  const mockHashedPassword = 'mockHashedPassword123'

  beforeEach(() => {
    jest.clearAllMocks()
    ;(bcryptjs.genSalt as jest.Mock).mockResolvedValue(mockSalt)
    ;(bcryptjs.hash as jest.Mock).mockResolvedValue(mockHashedPassword)
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
    ;(bcryptjs.genSalt as jest.Mock).mockRejectedValue(
      new Error('Salt generation failed')
    )

    await expect(hashPassword(mockPassword)).rejects.toThrow(
      'Salt generation failed'
    )
  })

  it('should throw an error if bcryptjs.hash fails', async () => {
    ;(bcryptjs.hash as jest.Mock).mockRejectedValue(new Error('Hashing failed'))

    await expect(hashPassword(mockPassword)).rejects.toThrow('Hashing failed')
  })
})
