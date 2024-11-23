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

export const generateDigitCode = (validHours: number = 1) => {
  const code = Math.floor(1000 + Math.random() * 9000).toString() // Generate a 4-digit code (1000-9999)
  const expirationDate = new Date().getTime() + 1000 * 3600 * validHours
  return { code, expirationDate }
}
