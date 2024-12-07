'use server'

import { auth } from '@/auth'
import UserModel from '@/models/UserModel'

interface Props {
  ids: string[]
  published: boolean
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

const updateUsersPublishedAction = async ({
  ids,
  published,
}: Props): Return => {
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

    const updatedUser = await UserModel.updateUsersPublished(ids, published)

    console.log({ updateUsersPublishedAction: 'success' })

    return {
      data: updatedUser,
      success: true,
    }
  } catch (error) {
    console.log({ updateUsersPublishedAction: error })

    return {
      data: null,
      success: false,
    }
  }
}

export default updateUsersPublishedAction
