'use server'

import { auth } from '@/auth'
import { CONSTANTS } from '@/utils'
import OrderModel from '@/models/OrderModel'
import { type OrderSlice } from '@/store/slices/ordersSlice'

const getOrdersAction = async () => {
  try {
    const session = await auth()

    let orders: OrderSlice[] = []

    if (session?.user.role === CONSTANTS.roleName.admin)
      orders = await OrderModel.getOrders()

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
