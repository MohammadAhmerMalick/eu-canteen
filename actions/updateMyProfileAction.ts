'use server'

import UserModel from '@/models/UserModel'
// import { storeFileLocally } from '@/utils'
import usersTable from '@/database/schema/usersSchema'
import { auth } from '@/auth'

const updateMyProfileAction = async (formData: FormData) => {
  try {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const whatsapp = formData.get('whatsapp') as string
    // const idCardFrontImageFile = formData.get('idCardFrontImage') as File
    // const idCardBackImageFile = formData.get('idCardBackImage') as File

    const session = await auth()
    const [user] = await UserModel.getUserById(session?.user.id)

    const payload: typeof usersTable.$inferInsert = {
      name,
      email: user.email,
      whatsapp,
      matricola: user.matricola,
    }

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

    const updatedUser = await UserModel.updateUser(payload, id)

    console.log({ updateMyProfileAction: 'success' })

    return {
      data: updatedUser,
      success: true,
      message: 'User updated',
      codeMessage: 'user_updated',
    }
  } catch (error) {
    console.log({ updateMyProfileAction: error })

    return {
      data: [],
      success: false,
      message: 'Unable to update user',
      codeMessage: 'server_error',
    }
  }
}

export default updateMyProfileAction
