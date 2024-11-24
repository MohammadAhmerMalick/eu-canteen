'use server'

import { auth } from '@/auth'
import OrderModel from '@/models/OrderModel'

interface Props {
  id: string
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

const updateOrderStatusAction = async ({ id, status }: Props): Return => {
  try {
    const session = await auth()

    if (session?.user.role !== 'admin')
      return {
        success: false,
        data: null,
      }

    const [updatedUser] = await OrderModel.updateOrderStatus(id, status)

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
