import { v4 as uuidv4 } from 'uuid'
import bcryptjs from 'bcryptjs'

/**
 * Generates a random UUID token with an expiration date.
 * @param {number} [validHours=1] Number of hours until expiration. Defaults to 1 hour.
 * @returns {{ token: string, expirationDate: number }} The generated token and its expiration date.
 */

export const generateUUIDToken = (
  validHours: number = 1
): { token: string; expirationDate: number } => {
  if (validHours <= 0) throw new Error('Token expiration must be positive')

  const token = uuidv4()
  const expirationDate = new Date().getTime() + 1000 * 3600 * validHours

  return { token, expirationDate }
}

/**
 * Generates a salted hash for the given password.
 * @param password Password to hash.
 * @param rounds Number of rounds to use for salting. Defaults to 10.
 * @returns A Promise resolving to the hashed password.
 */

export const hashPassword = async (
  password: string,
  rounds: number = 10
): Promise<string> => {
  const salt = await bcryptjs.genSalt(rounds)
  const hashedPassword = await bcryptjs.hash(password, salt)

  return hashedPassword
}

/**
 * Generates an n-digit numeric code and an expiration timestamp.
 * @param {number} [validHours=1] Number of hours until expiration. Defaults to 1 hour.
 * @param {number} [n=4] Number of digits in the code. Defaults to 4 digits.
 * @returns {{ code: string, expirationDate: number }} Generated code & its expiration date.
 *
 * @example
 * const { code, expirationDate } = generateNDigitCode(2, 6)
 * // `code` might be "123456"
 * // `expirationDate` would be 2 hours from the current time
 */

export const generateNDigitCode = (
  validHours: number = 1,
  n: number = 4
): { code: string; expirationDate: number } => {
  const min = Math.pow(10, n - 1) // Minimum n-digit number
  const max = Math.pow(10, n) - 1 // Maximum n-digit number
  const code = Math.floor(min + Math.random() * (max - min + 1)).toString() // Generate n-digit code
  const expirationDate = new Date().getTime() + 1000 * 3600 * validHours // Calculate expiration timestamp
  return { code, expirationDate }
}
