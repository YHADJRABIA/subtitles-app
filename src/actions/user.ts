import { getErrorMessage } from '@/utils/errors'
import axios from 'axios'

export const handleDeleteUserById = async (id: string) => {
  try {
    return await axios.delete(`/api/user`, {
      params: {
        id,
      },
      headers: { Authorization: '' },
    })
  } catch (err) {
    console.error('Error deleting user:', getErrorMessage(err))
  }
}

export const handleUpdateUserById = async (id: string) => {
  try {
    return await axios.patch(`/api/user`, {
      params: {
        id,
      },
      headers: { Authorization: '' },
    })
  } catch (err) {
    console.error('Error patching user:', getErrorMessage(err))
  }
}
