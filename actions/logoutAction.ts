'use server'

import { cookies } from 'next/headers'

const logoutAction = async () => {
  const cookieStore = await cookies()

  cookieStore.delete('token')
  return {
    success: true,
    message: 'Logout successful',
  }
}

export default logoutAction
