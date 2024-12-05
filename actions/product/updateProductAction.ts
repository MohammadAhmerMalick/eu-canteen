'use server'

import { uploadFile } from '@/utils'
import ProductModel from '@/models/ProductModel'
import productsTable from '@/database/schema/productsSchema'
import { type Products } from '@/store/slices/productsSlice'

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

const updateProductAction = async (formData: FormData): Return => {
  try {
    const id = formData.get('id') as string
    const image = formData.get('image') as File
    const name = formData.get('name') as string
    const price = formData.get('price') as string
    const published = formData.get('published') as string
    const categoryId = formData.get('categoryId') as string
    const description = formData.get('description') as string

    const payload: typeof productsTable.$inferInsert = {
      id,
      name,
      price,
      categoryId,
      description,
      image: image.name,
      published: !!published,
    }

    // store file locally
    if (image) {
      const uploadedImage = await uploadFile(image, 'products/')

      if (uploadedImage)
        payload.image = `${uploadedImage.public_id}.${uploadedImage.format}`
    }

    await ProductModel.updateProduct(payload)
    const [updatedProduct] = await ProductModel.getProduct(id)

    console.log({ updateProductAction: 'success' })

    return {
      success: true,
      data: updatedProduct,
    }
  } catch (error) {
    console.log({ updateProductAction: error })

    return {
      data: null,
      success: false,
    }
  }
}

export default updateProductAction
