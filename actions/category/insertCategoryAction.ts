'use server'

// import { storeFileLocally } from '@/utils'
import CategoryModel from '@/models/CategoryModel'

const insertCategoryAction = async (formData: FormData) => {
  const name = formData.get('name') as string
  const image = formData.get('image') as File

  if (!name || !image)
    return {
      data: [],
      success: false,
      message: 'All fields are required',
      codeMessage: 'fields_are_missing',
    }

  // if category exists
  const category = await CategoryModel.getCategoryByName(name)
  if (category.length)
    return {
      data: [],
      success: false,
      message: 'Category already exist',
      codeMessage: 'category_already_exist',
    }

  // const { destinationFileName } = await storeFileLocally(image, 'categories/')

  const newCategory = await CategoryModel.createCategory({
    name,
    image: image.name,
  })

  return {
    success: true,
    data: newCategory,
    message: 'Category created',
    codeMessage: 'category_created',
  }
}

export default insertCategoryAction
