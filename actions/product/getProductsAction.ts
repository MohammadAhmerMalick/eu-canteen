'use server'

import ProductModel from '@/models/ProductModel'

const getProductsAction = async () => {
  try {
    const products = await ProductModel.getProducts()

    console.log({ getProductsAction: 'success' })

    return {
      success: true,
      data: products,
    }
  } catch (error) {
    console.log({ getProductsAction: error })

    return {
      success: false,
      data: [],
    }
  }
}

export default getProductsAction
