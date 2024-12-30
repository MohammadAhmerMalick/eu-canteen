'use server'

import { randomUUID } from 'crypto'
import UserModel from '@/models/UserModel'
import { hashPassword } from '@/libs/bcrypt'
import { CONSTANTS, uploadFile } from '@/utils'
import type { User } from '@/database/schema/usersSchema'
import insertNotificationAction from '@/actions/notification/insertNotificationAction'

const insertUserAction = async (formData: FormData) => {
  try {
    const userType = formData.get('userType') as string
    const isPlayer = userType === CONSTANTS.roleName.player

    const name = formData.get('name') as string
    const image = formData.get('image') as File
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const whatsapp = formData.get('whatsapp') as string
    const matricola = isPlayer
      ? randomUUID()
      : (formData.get('matricola') as string)

    if (!(name && email && whatsapp))
      return {
        data: [],
        success: false,
        message: 'All fields are required',
      }

    // is email valid
    if (!/@campus.unimib.it\s*$/.test(email) && !isPlayer)
      return {
        data: [],
        success: false,
        message: 'Kindly use an authorized email',
      }

    // if user exists
    const user = await UserModel.getUserByEmailOrMatricola(email, matricola)
    if (user.length)
      return {
        data: [],
        success: false,
        message: 'User already exist',
      }

    const payload: User = {
      name,
      email,
      whatsapp,
      matricola,
      image: image.name,
      password: hashPassword(password),
      roleName: CONSTANTS.roleName.student,
    }

    if (isPlayer) {
      payload.approved = true
      payload.roleName = CONSTANTS.roleName.player
    }

    // store file locally
    if (image) {
      const uploadedImage = await uploadFile(image, 'students/')

      if (uploadedImage)
        payload.image = `${uploadedImage.public_id}.${uploadedImage.format}`
    }

    const newUser = await UserModel.createUser(payload)

    const admins = await UserModel.getAdmin()

    insertNotificationAction({
      to: admins.map((admin) => admin.id),
      message: `👤 New user ${name}${payload.roleName} with ${email} request in pending`,
    })

    console.log({ insertUserAction: 'success' })

    return {
      success: true,
      data: newUser,
      message: 'User created',
    }
  } catch (error) {
    console.log({ insertUserAction: error })

    return {
      success: false,
      data: [],
      message: 'Unable to create user',
    }
  }
}

export default insertUserAction
