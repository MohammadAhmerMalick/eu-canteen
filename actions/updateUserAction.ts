'use server'

import UserModel from '@/models/UserModel'
import { storeFileLocally } from '@/utils'
import usersTable from '@/database/schema/usersSchema'

const updateUserAction = async (formData: FormData) => {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const approved = formData.get('approved') as string
    const whatsapp = formData.get('whatsapp') as string
    const matricola = formData.get('matricola') as string
    const idCardFrontImageFile = formData.get('idCardFrontImage') as File
    const idCardBackImageFile = formData.get('idCardBackImage') as File

    // is email valid
    if (!/@compus.unimib.it\s*$/.test(email))
      return {
        success: false,
        message: 'Kindly use an authorized email',
        codeMessage: 'must_be_unimib_email',
      }

    const payload: typeof usersTable.$inferInsert = {
      name,
      email,
      whatsapp,
      matricola,
      approved: !!approved,
    }

    // store file locally
    if (idCardBackImageFile) {
      const { destinationFileName } = await storeFileLocally(
        idCardBackImageFile,
        'students/id-cards/'
      )
      payload.idCardBackImage = destinationFileName
    }
    if (idCardFrontImageFile) {
      const { destinationFileName } = await storeFileLocally(
        idCardFrontImageFile,
        'students/id-cards/'
      )
      payload.idCardFrontImage = destinationFileName
    }

    const user = await UserModel.updateUser(payload)

    console.log({ updateUserAction: 'success' })

    return {
      success: true,
      data: user,
      message: 'User updated',
      codeMessage: 'user_updated',
    }
  } catch (error) {
    console.log({ updateUserAction: error })
    return {
      success: false,
      data: {},
      message: 'Unable to update user',
      codeMessage: 'server_error',
    }
  }
}

export default updateUserAction
