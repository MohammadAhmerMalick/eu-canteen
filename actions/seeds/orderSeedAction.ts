'use server'

import UserModel from '@/models/UserModel'
import OrderModel from '@/models/OrderModel'
import ProductModel from '@/models/ProductModel'
import TransactionModel from '@/models/TransactionModel'
import { getRandomDate, randomFromArray } from '@/utils'

const orderSeedAction = async () => {
  try {
    const students = await UserModel.getAllStudents()
    const products = await ProductModel.getProducts()

    products.forEach(async () =>
      // { products: product }
      {
        const { products: product } = randomFromArray(products)
        const userId = randomFromArray(students).id

        const quantity = 1
        const productId = product.id
        const unitPrice = product.price
        const amount = (quantity * parseFloat(unitPrice)).toFixed(4)

        const date = new Date()
        const dateTime = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`

        const createdAt = getRandomDate(
          new Date(2024, 11, 0),
          new Date(2024, 11, 5)
        )

        const [transaction] = await TransactionModel.createTransaction({
          userId,
          productId,
          type: 'credit',
          description: `${product.name} ordered on ${dateTime}`,
          amount,
          createdAt,
        })

        const order = await OrderModel.createOrder({
          type: 'takeaway',
          userId,
          quantity,
          unitPrice,
          productId,
          transactionId: transaction.id,
          createdAt,
        })

        console.log({ order })
      }
    )
    console.log({ orderSeedAction: 'success' })
  } catch (error) {
    console.log({ orderSeedAction: error })
  }
}

export default orderSeedAction
