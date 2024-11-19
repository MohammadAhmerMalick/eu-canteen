'use server'

import { cookies } from 'next/headers'
import { signIn } from '../auth'

interface loginActionProps {
  email: string
  password: string
}

const loginAction = async ({ email, password }: loginActionProps) => {
  const cookieStore = await cookies()

  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)

  console.log('first')

  const x = await signIn('credentials', formData)

  console.log({ x })

  if (email === 'asad.com' && password === 'admintest') {
    cookieStore.set('token', 'testUsre')

    return {
      success: true,
      message: 'Login successful',
    }
  }

  cookieStore.delete('token')
  return {
    success: false,
    message: 'Invalid Credentials',
  }
}

export default loginAction
