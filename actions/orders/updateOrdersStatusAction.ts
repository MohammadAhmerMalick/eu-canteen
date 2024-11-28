'use server'

import { auth } from '@/auth'
import OrderModel from '@/models/OrderModel'

interface Props {
  ids: string[]
  status: string
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

const updateOrdersStatusAction = async ({ ids, status }: Props): Return => {
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

    const updatedUser = await OrderModel.updateOrdersStatus(ids, status)

    console.log({ updateOrdersStatusAction: 'success' })

    return {
      data: updatedUser,
      success: true,
    }
  } catch (error) {
    console.log({ updateOrdersStatusAction: error })

    return {
      data: null,
      success: false,
    }
  }
}

export default updateOrdersStatusAction
