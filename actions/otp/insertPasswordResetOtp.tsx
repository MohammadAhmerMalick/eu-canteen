'use server'

import { CONSTANTS } from '@/utils'
import Email from '@/libs/sendgrid'
import OtpModel from '@/models/otpModel'
import UserModel from '@/models/UserModel'

const insertPasswordResetOtp = async (email: string) => {
  try {
    const [user] = await UserModel.getUserByEmail(email as string)

    if (!user) {
      console.log({
        insertPasswordResetOtp: `No user with ${email} email found`,
      })

      return {
        success: false,
        message: `No user with ${email} email found`,
      }
    }

    if (!user.approved) {
      console.log({
        insertPasswordResetOtp:
          'Your request in not approved yet, please contact admin',
      })

      return {
        success: false,
        message: 'Your request in not approved yet, please contact admin',
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await OtpModel.createOtp({
      code: otp,
      userId: user.id,
      type: CONSTANTS.otpType.resetPassword,
    })

    await Email.sendOtp({
      otp,
      to: user.email,
      name: user.name,
    })

    console.log({ insertPasswordResetOtp: 'success' })

    return {
      success: true,
      message: `OTP sent to ${email}`,
    }
  } catch (error) {
    console.log({ insertPasswordResetOtp: error })

    return {
      success: false,
      message: 'Unable to send OTP',
    }
  }
}

export default insertPasswordResetOtp
