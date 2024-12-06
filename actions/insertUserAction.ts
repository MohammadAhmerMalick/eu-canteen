'use server'

import { uploadFile } from '@/utils'
import UserModel from '@/models/UserModel'
import usersTable from '@/database/schema/usersSchema'

const insertUserAction = async (formData: FormData) => {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const image = formData.get('image') as File
  const whatsapp = formData.get('whatsapp') as string
  const matricola = formData.get('matricola') as string

  if (!name || !email || !whatsapp || !matricola)
    return {
      data: [],
      success: false,
      message: 'All fields are required',
      codeMessage: 'fields_are_missing',
    }

  // is email valid
  if (!/@campus.unimib.it\s*$/.test(email))
    return {
      data: [],
      success: false,
      message: 'Kindly use an authorized email',
      codeMessage: 'must_be_unimib_email',
    }

  // if user exists
  const user = await UserModel.getUserByEmailOrMatricola(email, matricola)
  if (user.length)
    return {
      data: [],
      success: false,
      message: 'User already exist',
      codeMessage: 'user_already_exist',
    }

  const payload: typeof usersTable.$inferInsert = {
    name,
    email,
    whatsapp,
    matricola,
    image: image.name,
  }

  // store file locally
  if (image) {
    const uploadedImage = await uploadFile(image, 'students/')

    if (uploadedImage)
      payload.image = `${uploadedImage.public_id}.${uploadedImage.format}`
  }

  const newUser = await UserModel.createUser(payload)

  return {
    success: true,
    data: newUser,
    message: 'User created',
    codeMessage: 'user_created',
  }
}

export default insertUserAction
