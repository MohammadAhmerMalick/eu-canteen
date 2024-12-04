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

const updateProductsPublishedStateAction = async ({
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

    const updatedProduct = await ProductModel.updateProductsPublishedState(
      ids,
      published
    )

    console.log({ updateProductsPublishedStateAction: 'success' })

    return {
      data: updatedProduct,
      success: true,
    }
  } catch (error) {
    console.log({ updateProductsPublishedStateAction: error })

    return {
      data: null,
      success: false,
    }
  }
}

export default updateProductsPublishedStateAction
