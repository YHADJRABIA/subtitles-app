import { UserAPIType } from '@/types/user'
import { getErrorMessage } from '@/utils/errors'
import { websiteUrl } from '@/utils/general'
import axios from 'axios'

export const handleDeleteUserById = async (id: string) => {
  try {
    return await axios.delete('/api/user', { params: { id } })
  } catch (err) {
    console.error('Error deleting user:', getErrorMessage(err))
    throw err
  }
}

export const handleUpdateUserById = async (
  id: string,
  user: Partial<UserAPIType>
) => {
  try {
    return await axios.patch('/api/user', { id, user })
  } catch (err) {
    console.error('Error updating user:', getErrorMessage(err))
    throw err
  }
}

// Need to specify root url since this is called from API
export const handleVerifyEmail = async (email: string) => {
  try {
    return await axios.post(`${websiteUrl}/api/user/verify-email`, { email })
  } catch (err) {
    console.error('Error verifying user email:', getErrorMessage(err))
    throw err
  }
}
