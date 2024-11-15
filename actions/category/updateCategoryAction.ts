'use server'

import CategoryModel from '@/models/CategoryModel'
// import { storeFileLocally } from '@/utils'
import categoriesTable from '@/database/schema/categoriesSchema'

const updateCategoryAction = async (formData: FormData) => {
  try {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const published = formData.get('published') as string
    const image = formData.get('image') as File

    const payload: typeof categoriesTable.$inferInsert = {
      id,
      name,
      image: image.name,
      published: !!published,
    }

    // store file locally
    // if (image) {
    //   const { destinationFileName } = await storeFileLocally(
    //     image,
    //     'categories/'
    //   )
    //   payload.image = destinationFileName
    // }

    const category = await CategoryModel.updateCategory(payload)

    console.log({ updateCategoryAction: 'success' })

    return {
      success: true,
      data: category,
      message: 'Category updated',
      codeMessage: 'category_updated',
    }
  } catch (error) {
    console.log({ updateCategoryAction: error })

    return {
      success: false,
      data: [],
      message: 'Unable to update category',
      codeMessage: 'server_error',
    }
  }
}

export default updateCategoryAction
