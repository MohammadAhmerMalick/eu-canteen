'use server'

import { auth } from '@/auth'
import { CONSTANTS } from '@/utils'
import OrderModel from '@/models/OrderModel'
import { type OrderSlice } from '@/store/slices/ordersSlice'

interface getOrdersByDateActionProps {
  dateRange: {
    start: Date
    end: Date
  }
}

const getOrdersByDateAction = async ({
  dateRange,
}: getOrdersByDateActionProps) => {
  try {
    const session = await auth()

    let orders: OrderSlice[] = []

    // dateRange.end.setDate(new Date(dateRange.end).getDate() + 1)

    if (session?.user.role === CONSTANTS.roleName.admin)
      orders = await OrderModel.getOrdersByDate(dateRange.start, dateRange.end)

    console.log({ getOrdersByDateAction: 'success' })
    return {
      data: orders,
      success: true,
    }
  } catch (error) {
    console.log({ getOrdersByDateAction: error })

    return {
      data: [],
      success: false,
    }
  }
}

export default getOrdersByDateAction
