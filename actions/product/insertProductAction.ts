'use server'

import { uploadFile } from '@/utils'
import ProductModel from '@/models/ProductModel'
import { type Products } from '@/store/slices/productsSlice'
import type { Product } from '@/database/schema/productsSchema'

type Return = Promise<
  | {
      data: Products
      success: true
    }
  | {
      data: null
      success: false
    }
>

const insertProductAction = async (formData: FormData): Return => {
  try {
    const image = formData.get('image') as File
    const name = formData.get('name') as string
    const price = formData.get('price') as string
    const categoryId = formData.get('categoryId') as string
    const description = formData.get('description') as string

    if (!name || !image || price)
      return {
        data: null,
        success: false,
      }

    const payload: Product = {
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

    const [{ id }] = await ProductModel.createProduct(payload)
    const [newProduct] = await ProductModel.getProduct(id)

    console.log({ insertProductAction: 'success' })

    return {
      success: true,
      data: newProduct,
    }
  } catch (error) {
    console.log({ insertProductAction: error })

    return {
      data: null,
      success: false,
    }
  }
}

export default insertProductAction
