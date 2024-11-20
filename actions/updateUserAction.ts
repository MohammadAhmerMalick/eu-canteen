'use server'

import UserModel from '@/models/UserModel'
// import { storeFileLocally } from '@/utils'
import { hashPassword } from '@/libs/bcrypt'
import usersTable from '@/database/schema/usersSchema'

const updateUserAction = async (formData: FormData) => {
  try {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const approved = formData.get('approved') as string
    const whatsapp = formData.get('whatsapp') as string
    const matricola = formData.get('matricola') as string
    // const idCardFrontImageFile = formData.get('idCardFrontImage') as File
    // const idCardBackImageFile = formData.get('idCardBackImage') as File

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
    // if (idCardBackImageFile) {
    //   const { destinationFileName } = await storeFileLocally(
    //     idCardBackImageFile,
    //     'students/id-cards/'
    //   )
    //   payload.idCardBackImage = destinationFileName
    // }
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
