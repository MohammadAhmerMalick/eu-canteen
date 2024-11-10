'use server'

import ProductModel from '@/models/ProductModel'

const getAllProductsActions = async () => {
  try {
    const products = await ProductModel.getAllProducts()

    console.log({ getAllProductsActions: 'success' })

    return {
      success: true,
      data: products,
    }
  } catch (error) {
    console.log({ getAllProductsActions: error })

    return {
      success: false,
      data: [],
    }
  }
}

export default getAllProductsActions
