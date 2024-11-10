'use server'

import ProductModel from '@/models/ProductModel'

const getAllProductsAction = async () => {
  try {
    const products = await ProductModel.getAllProducts()

    console.log({ getAllProductsAction: 'success' })

    return {
      success: true,
      data: products,
    }
  } catch (error) {
    console.log({ getAllProductsAction: error })

    return {
      success: false,
      data: [],
    }
  }
}

export default getAllProductsAction
