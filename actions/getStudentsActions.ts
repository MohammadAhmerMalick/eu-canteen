'use server'

import UserModel from '@/models/UserModel'

const getStudentsActions = async () => {
  const students = await UserModel.getStudents()

  return {
    success: true,
    data: students,
  }
}

export default getStudentsActions
