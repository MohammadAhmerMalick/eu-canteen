'use server'

import { auth } from '@/auth'
import UserModel from '@/models/UserModel'
import { type Auth } from '@/store/slices/authSlice'

type Return = Promise<
  | {
      data: Auth
      success: true
    }
  | {
      data: null
      success: false
    }
>

const getMyProfileAction = async (): Return => {
  const session = await auth()

  if (session) {
    const [user] = await UserModel.getUserById(session?.user.id)

    if (user)
      return {
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.roleName,
          whatsapp: user.whatsapp,
          matricola: user.matricola,
          idCardBackImage: user.idCardBackImage,
          idCardFrontImage: user.idCardFrontImage,
          credit: parseFloat(user.credit).toFixed(2),
        },
      }
  }

  return {
    success: false,
    data: null,
  }
}

export default getMyProfileAction
