'use server'

import CategoryModel from '@/models/CategoryModel'

const deleteCategoryAction = async (formData: FormData) => {
  try {
    const id = formData.get('id') as string

    const res = await CategoryModel.deleteCategory(id)

    console.log({ deleteCategoryAction: 'success' })

    return {
      success: true,
      data: res,
      message: 'Category deleted',
      codeMessage: 'category_deleted',
    }
  } catch (error) {
    console.log({ deleteCategoryAction: error })

    return {
      success: false,
      data: {},
      message: 'Unable to delete category',
      codeMessage: 'server_error',
    }
  }
}

export default deleteCategoryAction
