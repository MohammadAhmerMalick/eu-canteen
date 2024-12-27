'use server'

import UserModel from '@/models/UserModel'
import { hashPassword } from '@/libs/bcrypt'
import { CONSTANTS, uploadFile } from '@/utils'
import type { User } from '@/database/schema/usersSchema'

type Return = Promise<
  | {
      data: User
      success: true
    }
  | {
      data: null
      success: false
    }
>

const updateUserAction = async (formData: FormData): Return => {
  try {
    const userType = formData.get('userType') as string
    const isPlayer = userType === CONSTANTS.roleName.player

    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const image = formData.get('image') as File
    const email = formData.get('email') as string
    const credit = formData.get('credit') as string
    const password = formData.get('password') as string
    const whatsapp = formData.get('whatsapp') as string
    const matricola = formData.get('matricola') as string

    // is email valid
    if (!/@campus.unimib.it\s*$/.test(email) && !isPlayer)
      return {
        data: null,
        success: false,
      }

    let payload: User = {
      name,
      email,
      whatsapp,
      matricola,
    }

    if (credit) payload.credit = credit

    if (password) payload = { ...payload, password: hashPassword(password) }

    // store file locally
    if (image) {
      const uploadedImage = await uploadFile(image, 'students/')

      if (uploadedImage)
        payload.image = `${uploadedImage.public_id}.${uploadedImage.format}`
    }

    const [user] = await UserModel.updateUser(payload, id)

    console.log({ updateUserAction: 'success' })

    return {
      data: user,
      success: true,
    }
  } catch (error) {
    console.log({ updateUserAction: error })

    return {
      data: null,
      success: false,
    }
  }
}

export default updateUserAction
