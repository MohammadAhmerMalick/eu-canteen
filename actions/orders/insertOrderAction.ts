'use server'

import { auth } from '@/auth'
import UserModel from '@/models/UserModel'
import OrderModel from '@/models/OrderModel'
import ProductModel from '@/models/ProductModel'
import TransactionModel from '@/models/TransactionModel'
import { type OrderSlice } from '@/store/slices/ordersSlice'
import insertNotificationAction from '@/actions/notification/insertNotificationAction'

interface InsertOrderActionProps {
  type: string
  quantity: number
  productId: string
  createdAt?: Date
}

type Return = Promise<
  | {
      data: OrderSlice
      success: true
    }
  | {
      data: null
      success: false
    }
>

const insertOrderAction = async ({
  type,
  quantity,
  productId,
  createdAt,
}: InsertOrderActionProps): Return => {
  try {
    const session = await auth()
    const userId = session?.user.id
    const [user] = await UserModel.getUserById(userId) // user data

    const [{ products: product }] = await ProductModel.getProduct(productId) // product data
    const unitPrice = product.price

    const amount = quantity * parseFloat(unitPrice) // net amount

    const date = new Date()
    const dateTime = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`

    const [transaction] = await TransactionModel.createTransaction({
      userId,
      productId: product.id,
      type: 'credit',
      description: `${product.name} ordered on ${dateTime}`,
      amount: amount.toFixed(4),
      createdAt,
    })

    const updatedCredit = (parseFloat(user.credit) + amount).toFixed(4)
    await UserModel.updateUserCredit(userId, updatedCredit)

    const [newOrderId] = await OrderModel.createOrder({
      type,
      userId,
      quantity,
      unitPrice,
      productId,
      transactionId: transaction.id,
      createdAt,
    })

    const [newOrder] = await OrderModel.getOrder(newOrderId.id)

    const admins = await UserModel.getAdmin()

    insertNotificationAction({
      to: admins.map((admin) => admin.id),
      message: `🍔 ${user.name}(${user.email}) had placed the order: ${product.name}`,
    })

    console.log({ insertOrderAction: 'success' })

    return {
      success: true,
      data: newOrder,
    }
  } catch (error) {
    console.log({ insertOrderAction: error })

    return {
      success: false,
      data: null,
    }
  }
}

export default insertOrderAction
