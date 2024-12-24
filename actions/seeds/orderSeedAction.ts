'use server'

import ProductModel from '@/models/ProductModel'
import { getRandomDate, randomFromArray } from '@/utils'
import insertOrderAction from '@/actions/orders/insertOrderAction'

const orderSeedAction = async () => {
  try {
    const products = await ProductModel.getProducts()

    products.forEach(async () => {
      const { products: product } = randomFromArray(products)

      const quantity = 1
      const productId = product.id

      const createdAt = getRandomDate(new Date(2024, 11, 5), new Date())

      const order = await insertOrderAction({
        type: 'takeaway',
        quantity,
        productId,
        createdAt,
      })

      console.log({ orderSeedAction: order })
    })
    console.log({ orderSeedAction: 'success' })
  } catch (error) {
    console.log({ orderSeedAction: error })
  }
}

export default orderSeedAction
