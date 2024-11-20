'use server'

import { auth, signIn } from '@/auth'
import { isRedirectError } from 'next/dist/client/components/redirect'

interface loginActionProps {
  email: string
  password: string
}

const loginAction = async ({ email, password }: loginActionProps) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)

  try {
    await signIn('credentials', formData)
  } catch (err) {
    if (!isRedirectError(err))
      return {
        data: {},
        success: false,
        message: 'Something went wrong',
      }
  }

  const session = await auth()

  if (session?.user?.id)
    return {
      data: session?.user,
      success: true,
      message: 'Successful login',
    }

  return {
    data: {},
    success: false,
    message: 'Invalid Credentials',
  }
}

export default loginAction
