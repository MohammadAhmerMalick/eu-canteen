'use server'

import { auth } from '@/auth'
import UserModel from '@/models/UserModel'

const getMyProfileAction = async () => {
  const session = await auth()
  const user = await UserModel.getUserById(session?.user.id)

  return {
    success: true,
    data: user,
  }
}

export default getMyProfileAction
