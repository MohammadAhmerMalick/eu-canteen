'use server'

import { auth } from '@/auth'
import OrderModel from '@/models/OrderModel'

interface Props {
  ids: string[]
  status: string
}
type Return = Promise<
  | {
      data: { id: string }
      success: true
    }
  | {
      data: null
      success: false
    }
>

const updateOrderStatusAction = async ({ ids, status }: Props): Return => {
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

    const [updatedUser] = await OrderModel.updateOrderStatus(ids, status)

    console.log({ updateOrderStatusAction: 'success' })

    return {
      data: updatedUser,
      success: true,
    }
  } catch (error) {
    console.log({ updateOrderStatusAction: error })

    return {
      data: null,
      success: false,
    }
  }
}

export default updateOrderStatusAction
