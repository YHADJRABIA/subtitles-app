import { VerificationTokenModel } from '@/models/verificationToken.model'
import {
  deleteVerificationTokenById,
  getVerificationTokenByEmail,
} from '@/utils/db/verification-token'
import { v4 as uuidv4 } from 'uuid'

export const generateVerificationToken = async (email: string) => {
  // Generate random token
  const token = uuidv4() // Not using JWT because storing data in the token is irrelevant here
  const expires = new Date().getTime() + 1000 * 3600 * 1 // Token expires in 1 hour

  // Check if existing token already sent for this email to delete it
  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await deleteVerificationTokenById(existingToken.id)
  }

  // Create verification token
  const verificationToken = await VerificationTokenModel.create({
    email,
    token,
    expires: new Date(expires),
  })

  return verificationToken
}
