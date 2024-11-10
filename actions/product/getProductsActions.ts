'use server'

import ProductModel from '@/models/ProductModel'

const getProductsActions = async () => {
  try {
    const products = await ProductModel.getProducts()

    console.log({ getProductsActions: 'success' })

    return {
      success: true,
      data: products,
    }
  } catch (error) {
    console.log({ getProductsActions: error })

    return {
      success: false,
      data: [],
    }
  }
}

export default getProductsActions
