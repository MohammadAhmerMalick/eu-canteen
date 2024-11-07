'use server'

import UserModel from '@/models/UserModel'

interface insertUserActioProps {
  name: string
  email: string
  whatsapp: string
  matricola: string
  idCardBackImage: string
  idCardFrontImage: string
}

const insertUserAction = async ({
  name,
  email,
  whatsapp,
  matricola,
  idCardBackImage,
  idCardFrontImage,
}: insertUserActioProps) => {
  if (
    !name ||
    !email ||
    !whatsapp ||
    !matricola ||
    !idCardFrontImage ||
    !idCardBackImage
  )
    return {
      success: false,
      message: 'All fields are required',
      codeMessage: 'fields_are_missing',
    }

  // if user exists
  const user = await UserModel.getUserByEmail(email)
  if (user.length)
    return {
      success: false,
      message: 'User already exist',
      codeMessage: 'user_already_exist',
    }

  const newUser = await UserModel.createUser({
    name,
    email,
    whatsapp,
    matricola,
    idCardBackImage,
    idCardFrontImage,
  })

  return {
    success: true,
    data: newUser,
    message: 'User created',
    codeMessage: 'user_created',
  }
}

export default insertUserAction
