'use server'

import { auth } from '@/auth'
import OrderModel from '@/models/OrderModel'
import ProductModel from '@/models/ProductModel'

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

  const newOrderId = await OrderModel.createOrder({
    type,
    unitPrice,
    quantity,
    userId,
    productId,
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
