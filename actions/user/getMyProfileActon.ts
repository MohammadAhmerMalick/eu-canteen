'use server'

import { auth } from '@/auth'
import UserModel from '@/models/UserModel'
import { type Auth } from '@/store/slices/authSlice'
import TransactionModel from '@/models/TransactionModel'

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
  try {
    const session = await auth()

    if (session) {
      const [user] = await UserModel.getUserById(session?.user.id)

      const amount = await TransactionModel.getUserTodaysTransactions(user.id)

      const credit = amount
        .reduce((a, b) => Number(a) + Number(b.amount), 0)
        .toString()

      await UserModel.updateUserCredit(user.id, credit)

      if (user) {
        console.log({ getMyProfileAction: 'success' })

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
            credit: parseFloat(credit).toFixed(2),
          },
        }
      }
    }

    console.log({ getMyProfileAction: 'no user' })

    return {
      success: false,
      data: null,
    }
  } catch (error) {
    console.log({ getMyProfileAction: error })

    return {
      success: false,
      data: null,
    }
  }
}

export default getMyProfileAction
