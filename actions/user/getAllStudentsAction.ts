'use server'

import UserModel from '@/models/UserModel'

const getAllStudentsAction = async () => {
  const students = await UserModel.getAllStudents()

  return {
    success: true,
    data: students,
  }
}

export default getAllStudentsAction
