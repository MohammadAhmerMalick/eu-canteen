'use server'

import { auth } from '@/auth'
import ProductModel from '@/models/ProductModel'

interface Props {
  ids: string[]
  published: boolean
}
type Return = Promise<
  | {
      data: { id: string }[]
      success: true
    }
  | {
      data: null
      success: false
    }
>

const updateProductsPublishedAction = async ({
  ids,
  published,
}: Props): Return => {
  try {
    const session = await auth()

    if (session?.user.role !== 'admin')
      return {
        success: false,
        data: null,
      }

    if (!ids.length)
      return {
        data: null,
        success: false,
      }

    const updatedProduct = await ProductModel.updateProductsPublished(
      ids,
      published
    )

    console.log({ updateProductsPublishedAction: 'success' })

    return {
      data: updatedProduct,
      success: true,
    }
  } catch (error) {
    console.log({ updateProductsPublishedAction: error })

    return {
      data: null,
      success: false,
    }
  }
}

export default updateProductsPublishedAction
