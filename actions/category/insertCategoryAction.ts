'use server'

import { uploadFile } from '@/utils'
import CategoryModel from '@/models/CategoryModel'
import { type Category } from '@/database/schema/categoriesSchema'

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

  const payload: Category = {
    name,
    image: image.name,
  }

  // store file locally
  const uploadedImage = await uploadFile(image, 'categories/')

  if (uploadedImage)
    payload.image = `${uploadedImage.public_id}.${uploadedImage.format}`

  const newCategory = await CategoryModel.createCategory(payload)

  return {
    success: true,
    data: newCategory,
    message: 'Category created',
    codeMessage: 'category_created',
  }
}

export default insertCategoryAction
