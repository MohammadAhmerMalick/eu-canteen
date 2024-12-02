'use server'

import { uploadFile } from '@/utils'
import UserModel from '@/models/UserModel'
import { hashPassword } from '@/libs/bcrypt'
import usersTable from '@/database/schema/usersSchema'

const updateUserAction = async (formData: FormData) => {
  try {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const image = formData.get('image') as File
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const approved = formData.get('approved') as string
    const whatsapp = formData.get('whatsapp') as string
    const matricola = formData.get('matricola') as string

    // is email valid
    if (!/@campus.unimib.it\s*$/.test(email))
      return {
        data: [],
        success: false,
        codeMessage: 'must_be_unimib_email',
        message: 'Kindly use an authorized email',
      }

    let payload: typeof usersTable.$inferInsert = {
      name,
      email,
      whatsapp,
      matricola,
      approved: !!approved,
    }

    if (password) payload = { ...payload, password: hashPassword(password) }

    // store file locally
    if (image) {
      const x = await uploadFile(image)
      console.log({ x })
      // payload.image = destinationFileName
    }
    // if (idCardFrontImageFile) {
    //   const { destinationFileName } = await storeFileLocally(
    //     idCardFrontImageFile,
    //     'students/id-cards/'
    //   )
    //   payload.idCardFrontImage = destinationFileName
    // }

    const user = await UserModel.updateUser(payload, id)

    console.log({ updateUserAction: 'success' })

    return {
      data: user,
      success: true,
      message: 'User updated',
      codeMessage: 'user_updated',
    }
  } catch (error) {
    console.log({ updateUserAction: error })

    return {
      data: [],
      success: false,
      message: 'Unable to update user',
      codeMessage: 'server_error',
    }
  }
}

export default updateUserAction
