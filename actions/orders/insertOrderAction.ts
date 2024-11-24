'use server'

import { auth } from '@/auth'
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

  const [transaction] = await TransactionModel.createTransaction({
    userId,
    productId: product.id,
    transactionType: 'credit',
    description: `${product.name} ordered on ${dateTime}`,
    amount: (quantity * parseFloat(unitPrice)).toFixed(4),
  })

  const newOrderId = await OrderModel.createOrder({
    type,
    userId,
    quantity,
    unitPrice,
    productId,
    transactionId: transaction.id,
  })

  const newOrder = await OrderModel.getOrdersId(newOrderId[0].id)

  return {
    success: true,
    data: newOrder,
    message: 'Order created',
    codeMessage: 'category_created',
  }
}

export default insertOrderAction
