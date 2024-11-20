'use server'

// import { signOut } from '@/auth'

const logoutAction = async () => {
  // signOut()

  return {
    success: true,
    message: 'Logout successful',
  }
}

export default logoutAction
