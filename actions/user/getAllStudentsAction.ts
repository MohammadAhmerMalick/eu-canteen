'use server'

import UserModel from '@/models/UserModel'

const getAllStudentsAction = async () => {
  const students = await UserModel.getAllStudents()

  console.log({ getAllStudentsAction: 'success' })

  return {
    success: true,
    data: students,
  }
}

export default getAllStudentsAction
