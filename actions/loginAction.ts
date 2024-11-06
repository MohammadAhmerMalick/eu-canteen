'use server'

import { cookies } from 'next/headers'

interface loginActionProps {
  email: string
  password: string
}

const loginAction = async ({ email, password }: loginActionProps) => {
  const cookieStore = await cookies()

  if (email === 'asad@poolaster.com' && password === 'admintest') {
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
