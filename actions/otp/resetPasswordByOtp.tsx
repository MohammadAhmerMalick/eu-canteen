'use server'

import { CONSTANTS } from '@/utils'
import OtpModel from '@/models/otpModel'
import UserModel from '@/models/UserModel'
import { hashPassword } from '@/libs/bcrypt'

interface ResetPasswordByOtpProps {
  otp: string
  email: string
  password: string
}

const resetPasswordByOtp = async ({
  otp,
  email,
  password,
}: ResetPasswordByOtpProps) => {
  try {
    const [user] = await UserModel.getUserByEmail(email as string)

    if (!user) {
      console.log({
        resetPasswordByOtp: `No user with ${email} email found`,
      })

      return {
        success: false,
        message: `No user with ${email} email found`,
      }
    }

    if (!user.approved) {
      console.log({
        resetPasswordByOtp:
          'Your request in not approved yet, please contact admin',
      })

      return {
        success: false,
        message: 'Your request in not approved yet, please contact admin',
      }
    }

    const date = new Date()

    const [res] = await OtpModel.getOtpByUserIdAndType({
      otp,
      type: CONSTANTS.otpType.resetPassword,
      userId: user.id,
      date: new Date(date.setMinutes(date.getMinutes() + 20)),
    })

    if (!res)
      return {
        success: false,
        message: 'OTP expired',
      }

    UserModel.updateUser(
      {
        ...user,
        password: hashPassword(password),
      },
      user.id
    )

    console.log({ resetPasswordByOtp: 'success' })

    return {
      success: true,
      message: `Password has been updated`,
    }
  } catch (error) {
    console.log({ resetPasswordByOtp: error })

    return {
      success: false,
      message: 'Unable to update password',
    }
  }
}

export default resetPasswordByOtp
