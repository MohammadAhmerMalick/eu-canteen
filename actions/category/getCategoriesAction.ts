'use server'

import CategoryModel from '@/models/CategoryModel'

const getCategoriesAction = async () => {
  try {
    const categories = await CategoryModel.getCategories()

    console.log({ getCategoriesAction: 'success' })

    return {
      success: true,
      data: categories,
    }
  } catch (error) {
    console.log({ getCategoriesAction: error })

    return {
      success: false,
      data: [],
    }
  }
}

export default getCategoriesAction
