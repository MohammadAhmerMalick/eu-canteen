'use server'

import CategoryModel from '@/models/CategoryModel'

const getAllCategoriesActions = async () => {
  try {
    const categories = await CategoryModel.getAllCategories()

    console.log({ getAllCategoriesActions: 'success' })

    return {
      success: true,
      data: categories,
    }
  } catch (error) {
    console.log({ getAllCategoriesActions: error })

    return {
      success: false,
      data: [],
    }
  }
}

export default getAllCategoriesActions
