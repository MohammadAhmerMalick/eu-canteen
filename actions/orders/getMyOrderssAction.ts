'use server'

import { auth } from '@/auth'
import OrderModel from '@/models/OrderModel'

const getMyOrdersAction = async () => {
  try {
    const session = await auth()

    const orders = await OrderModel.getOrdersByUserId(session?.user.id || '')

    console.log({ getMyOrdersAction: 'success' })

    return {
      data: orders,
      success: true,
    }
  } catch (error) {
    console.log({ getMyOrdersAction: error })

    return {
      data: [],
      success: false,
    }
  }
}

export default getMyOrdersAction
