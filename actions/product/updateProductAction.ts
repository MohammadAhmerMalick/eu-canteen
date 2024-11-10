'use server'

import ProductModel from '@/models/ProductModel'
// import { storeFileLocally } from '@/utils'
import productsTable from '@/database/schema/productsSchema'

const updateProductAction = async (formData: FormData) => {
  try {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const stock = formData.get('stock') as string
    const price = formData.get('price') as string
    const published = formData.get('published') as string
    const image = formData.get('image') as File

    const payload: typeof productsTable.$inferInsert = {
      id,
      name,
      description,
      stock: Number(stock),
      price: Number(price),
      image: image.name,
      published: !!published,
    }

    // store file locally
    // if (image) {
    //   const { destinationFileName } = await storeFileLocally(
    //     image,
    //     'products/'
    //   )
    //   payload.image = destinationFileName
    // }

    const product = await ProductModel.updateProduct(payload)

    console.log({ updateProductAction: 'success' })

    return {
      success: true,
      data: product,
      message: 'Product updated',
      codeMessage: 'product_updated',
    }
  } catch (error) {
    console.log({ updateProductAction: error })
    return {
      success: false,
      data: {},
      message: 'Unable to update product',
      codeMessage: 'server_error',
    }
  }
}

export default updateProductAction
