'use server'

import UserModel from '@/models/UserModel'

const getStudentsAction = async () => {
  const students = await UserModel.getStudents()

  return {
    success: true,
    data: students,
  }
}

export default getStudentsAction
