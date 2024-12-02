'use server'

import { auth } from '@/auth'
import { uploadFile } from '@/utils'
import UserModel from '@/models/UserModel'
import usersTable from '@/database/schema/usersSchema'

type Return = Promise<
  | {
      data: typeof usersTable.$inferInsert
      success: true
    }
  | {
      data: null
      success: false
    }
>

const updateMyProfileAction = async (formData: FormData): Return => {
  try {
    const session = await auth()

    const name = formData.get('name') as string
    const image = formData.get('image') as File
    const whatsapp = formData.get('whatsapp') as string
    const userId = session?.user.id

    const [user] = await UserModel.getUserById(userId)

    const payload: typeof usersTable.$inferInsert = {
      name,
      whatsapp,
      email: user.email,
      matricola: user.matricola,
    }

    // store file locally
    if (image) {
      const uploadedImage = await uploadFile(image, 'students/')

      if (uploadedImage)
        payload.image = `${uploadedImage.public_id}.${uploadedImage.format}`
    }

    const [updatedUser] = await UserModel.updateUser(payload, userId)

    console.log({ updateMyProfileAction: 'success' })

    return {
      data: updatedUser,
      success: true,
    }
  } catch (error) {
    console.log({ updateMyProfileAction: error })

    return {
      data: null,
      success: false,
    }
  }
}

export default updateMyProfileAction
