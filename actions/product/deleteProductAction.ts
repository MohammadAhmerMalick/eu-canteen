'use server'

import ProductModel from '@/models/ProductModel'

const deleteProductAction = async (formData: FormData) => {
  try {
    const id = formData.get('id') as string

    const res = await ProductModel.deleteProduct(id)

    console.log({ deleteProductAction: 'success' })

    return {
      success: true,
      data: res,
      message: 'Product deleted',
      codeMessage: 'product_deleted',
    }
  } catch (error) {
    console.log({ deleteProductAction: error })

    return {
      success: false,
      data: [],
      message: 'Unable to delete product',
      codeMessage: 'server_error',
    }
  }
}

export default deleteProductAction
