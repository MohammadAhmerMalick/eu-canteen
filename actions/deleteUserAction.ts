'use server'

import UserModel from '@/models/UserModel'

const deleteUserAction = async (formData: FormData) => {
  try {
    const id = formData.get('id') as string

    const res = await UserModel.deleteUser(id)

    console.log({ deleteUserAction: 'success' })

    return {
      success: true,
      data: res,
      message: 'User deleted',
      codeMessage: 'user_deleted',
    }
  } catch (error) {
    console.log({ deleteUserAction: error })

    return {
      success: false,
      data: {},
      message: 'Unable to delete user',
      codeMessage: 'server_error',
    }
  }
}

export default deleteUserAction
