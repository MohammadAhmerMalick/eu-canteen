'use server'

import { auth } from '@/auth'
import UserModel from '@/models/UserModel'
import OrderModel from '@/models/OrderModel'
import ProductModel from '@/models/ProductModel'
import TransactionModel from '@/models/TransactionModel'

interface InsertOrderActionProps {
  type: string
  quantity: number
  productId: string
}
const insertOrderAction = async ({
  type,
  quantity,
  productId,
}: InsertOrderActionProps) => {
  const session = await auth()
  const userId = session?.user.id

  const [product] = await ProductModel.getProduct(productId)
  const unitPrice = product.price

  const date = new Date()
  const dateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

  const amount = quantity * parseFloat(unitPrice)
  const [transaction] = await TransactionModel.createTransaction({
    userId,
    productId: product.id,
    type: 'credit',
    description: `${product.name} ordered on ${dateTime}`,
    amount: amount.toFixed(4),
  })

  const [user] = await UserModel.getUserById(userId)

  const updatedCredit = (parseFloat(user.credit) - amount).toFixed(4)
  await UserModel.updateUserCredit(userId, updatedCredit)

  const [newOrderId] = await OrderModel.createOrder({
    type,
    userId,
    quantity,
    unitPrice,
    productId,
    transactionId: transaction.id,
  })

  const newOrder = await OrderModel.getOrdersId(newOrderId.id)

  return {
    success: true,
    data: newOrder,
    message: 'Order created',
    codeMessage: 'category_created',
  }
}

export default insertOrderAction
