'use server'

import UserModel from '@/models/UserModel'
// import { storeFileLocally } from '@/utils'
import usersTable from '@/database/schema/usersSchema'

const insertUserAction = async (formData: FormData) => {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const whatsapp = formData.get('whatsapp') as string
  const matricola = formData.get('matricola') as string
  const idCardFrontImageFile = formData.get('idCardFrontImage') as File
  const idCardBackImageFile = formData.get('idCardBackImage') as File

  if (
    !name ||
    !email ||
    !whatsapp ||
    !matricola ||
    !idCardBackImageFile ||
    !idCardFrontImageFile
  )
    return {
      success: false,
      message: 'All fields are required',
      codeMessage: 'fields_are_missing',
    }

  // is email valid
  if (!/@compus.unimib.it\s*$/.test(email))
    return {
      success: false,
      message: 'Kindly use an authorized email',
      codeMessage: 'must_be_unimib_email',
    }

  // if user exists
  const user = await UserModel.getUserByEmail(email)
  if (user.length)
    return {
      success: false,
      message: 'User already exist',
      codeMessage: 'user_already_exist',
    }

  // store file locally
  // const { destinationFileName: idCardBackImage } = await storeFileLocally(
  //   idCardBackImageFile,
  //   'students/id-cards/'
  // )
  // const { destinationFileName: idCardFrontImage } = await storeFileLocally(
  //   idCardFrontImageFile,
  //   'students/id-cards/'
  // )

  const payload: typeof usersTable.$inferInsert = {
    name,
    email,
    whatsapp,
    matricola,
    idCardBackImage: idCardFrontImageFile.name,
    idCardFrontImage: idCardBackImageFile.name,
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
