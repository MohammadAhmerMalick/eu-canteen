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
  createdAt?: Date
}
const insertOrderAction = async ({
  type,
  quantity,
  productId,
  createdAt,
}: InsertOrderActionProps) => {
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

  const newOrder = await OrderModel.getOrder(newOrderId.id)

  return {
    success: true,
    data: newOrder,
    message: 'Order created',
    codeMessage: 'category_created',
  }
}

export default insertOrderAction
