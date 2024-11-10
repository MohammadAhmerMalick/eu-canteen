'use server'

import CategoryModel from '@/models/CategoryModel'

const getCategoriesActions = async () => {
  try {
    const categories = await CategoryModel.getCategories()

    console.log({ getCategoriesActions: 'success' })

    return {
      success: true,
      data: categories,
    }
  } catch (error) {
    console.log({ getCategoriesActions: error })

    return {
      success: false,
      data: [],
    }
  }
}

export default getCategoriesActions
