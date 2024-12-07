'use server'

import { auth } from '@/auth'
import UserModel from '@/models/UserModel'

interface Props {
  ids: string[]
  approved: boolean
}
type Return = Promise<
  | {
      data: { id: string }[]
      success: true
    }
  | {
      data: null
      success: false
    }
>

const updateUsersApprovedAction = async ({ ids, approved }: Props): Return => {
  try {
    const session = await auth()

    if (session?.user.role !== 'admin')
      return {
        success: false,
        data: null,
      }

    if (!ids.length)
      return {
        data: null,
        success: false,
      }

    const updatedUser = await UserModel.updateUsersApproved(ids, approved)

    console.log({ updateUsersApprovedAction: 'success' })

    return {
      data: updatedUser,
      success: true,
    }
  } catch (error) {
    console.log({ updateUsersApprovedAction: error })

    return {
      data: null,
      success: false,
    }
  }
}

export default updateUsersApprovedAction
