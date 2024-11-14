'use server'

// import { storeFileLocally } from '@/utils'
import ProductModel from '@/models/ProductModel'

const insertProductAction = async (formData: FormData) => {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const stock = formData.get('stock') as string
  const price = formData.get('price') as string
  const image = formData.get('image') as File

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
    image: image.name,
    description,
    stock: Number(stock),
    price: Number(price),
  })

  return {
    success: true,
    data: newProduct,
    message: 'Product created',
    codeMessage: 'product_created',
  }
}

export default insertProductAction
