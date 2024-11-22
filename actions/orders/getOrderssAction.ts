'use server'

import { auth } from '@/auth'
import OrderModel from '@/models/OrderModel'
import { type Orders } from '@/store/slices/ordersSlice'

const getOrdersAction = async () => {
  try {
    const session = await auth()

    let orders: Orders[] = []

    if (session?.user.role === 'admin') orders = await OrderModel.getOrders()

    console.log({ getOrdersAction: 'success' })

    return {
      data: orders,
      success: true,
    }
  } catch (error) {
    console.log({ getOrdersAction: error })

    return {
      data: [],
      success: false,
    }
  }
}

export default getOrdersAction
