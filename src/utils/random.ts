import { v4 as uuidv4 } from 'uuid'

/**
 * Generates a random UUID token with an expiration date.
 * @param {number} [validHours=1] - Number of hours until expiration. Defaults to 1 hour.
 * @returns {{ token: string, expirationDate: number }} - The generated token and its expiration date.
 */

export const generateUUIDToken = (
  validHours: number = 1
): { token: string; expirationDate: number } => {
  if (validHours <= 0) throw new Error('Token expiration must be positive')

  const token = uuidv4()
  const expirationDate = new Date().getTime() + 1000 * 3600 * validHours

  return {
    token,
    expirationDate,
  }
}
