'use server'

// import { storeFileLocally } from '@/utils'
import ProductModel from '@/models/ProductModel'

const insertProductAction = async (formData: FormData) => {
  const image = formData.get('image') as File
  const name = formData.get('name') as string
  const price = formData.get('price') as string
  const categoryId = formData.get('categoryId') as string
  const description = formData.get('description') as string

  if (!name || !image)
    return {
      data: [],
      success: false,
      message: 'All fields are required',
      codeMessage: 'fields_are_missing',
    }

  // const { destinationFileName } = await storeFileLocally(image, 'products/')

  const newProduct = await ProductModel.createProduct({
    name,
    price,
    categoryId,
    description,
    image: image.name,
  })

  return {
    success: true,
    data: newProduct,
    message: 'Product created',
    codeMessage: 'product_created',
  }
}

export default insertProductAction
