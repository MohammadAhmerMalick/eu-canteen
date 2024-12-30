'use server'

import { auth } from '@/auth'
import { CONSTANTS } from '@/utils'
import Email from '@/libs/sendgrid'
import UserModel from '@/models/UserModel'
import insertNotificationAction from '@/actions/notification/insertNotificationAction'

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

    if (session?.user.role !== CONSTANTS.roleName.admin)
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

    updatedUser.forEach((user) => {
      Email.send({ name: user.name, to: user.email })
    })

    const message = 'Your Account has been approved'

    insertNotificationAction({ message, to: ids })

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
