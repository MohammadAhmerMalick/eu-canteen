'use server'

import { auth } from '@/auth'
import ProductModel from '@/models/ProductModel'
import { type Products } from '@/store/slices/productsSlice'

const getAllProductsAction = async () => {
  try {
    const session = await auth()

    let products: Products[] = []

    if (session?.user.role === 'admin')
      products = await ProductModel.getAllProducts()

    console.log({ getAllProductsAction: 'success' })

    return {
      data: products,
      success: true,
    }
  } catch (error) {
    console.log({ getAllProductsAction: error })

    return {
      data: [],
      success: false,
    }
  }
}

export default getAllProductsAction
