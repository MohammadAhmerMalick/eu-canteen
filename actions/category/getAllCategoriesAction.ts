'use server'

import CategoryModel from '@/models/CategoryModel'

const getAllCategoriesAction = async () => {
  try {
    const categories = await CategoryModel.getAllCategories()

    console.log({ getAllCategoriesAction: 'success' })

    return {
      success: true,
      data: categories,
    }
  } catch (error) {
    console.log({ getAllCategoriesAction: error })

    return {
      success: false,
      data: [],
    }
  }
}

export default getAllCategoriesAction
