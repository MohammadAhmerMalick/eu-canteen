'use server'

import { signIn } from '@/auth'

interface loginActionProps {
  email: string
  password: string
}

const loginAction = async ({ email, password }: loginActionProps) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)

  await signIn('credentials', formData)

  return {
    success: false,
    message: 'Invalid Credentials',
  }
}

export default loginAction
