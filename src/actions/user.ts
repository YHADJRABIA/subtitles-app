import { getErrorMessage } from '@/utils/errors'
import axios from 'axios'

export const handleDeleteUserById = async (id: string) => {
  try {
    return await axios.delete(`/api/user`, {
      params: {
        id,
      },
    })
  } catch (err) {
    console.error('Error deleting user:', getErrorMessage(err))
    throw err
  }
}

export const handleUpdateUserById = async (
  id: string,
  user: { name: string }
) => {
  try {
    return await axios.put(`/api/user`, {
      id,
      user,
    })
  } catch (err) {
    console.error('Error updating user:', getErrorMessage(err))
    throw err
  }
}
