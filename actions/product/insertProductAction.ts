'use server'

import { uploadFile } from '@/utils'
import ProductModel from '@/models/ProductModel'
import productsTable from '@/database/schema/productsSchema'

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

  const payload: typeof productsTable.$inferInsert = {
    name,
    price,
    categoryId,
    description,
    image: image.name,
  }

  // store file locally
  if (image) {
    const uploadedImage = await uploadFile(image, 'products/')

    if (uploadedImage)
      payload.image = `${uploadedImage.public_id}.${uploadedImage.format}`
  }

  const newProduct = await ProductModel.createProduct(payload)

  return {
    success: true,
    data: newProduct,
    message: 'Product created',
    codeMessage: 'product_created',
  }
}

export default insertProductAction
