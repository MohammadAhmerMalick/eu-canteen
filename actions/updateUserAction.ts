'use server'

import fs from 'fs'
import path from 'path'

const updateUserAction = async (formData: FormData) => {
  const data = { x: 'x' }

  // console.log({ data, usersPath, USERS_FILE_PATH })
  // fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(data))

  try {
    const USERS_FILE_PATH = path.join('/tmp', 'data.json')
    console.log({ USERS_FILE_PATH })
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(data))
  } catch (error) {
    console.log({ 1: error })
  }

  try {
    const USERS_FILE_PATH = path.join('/tmp', 'data1.json')
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(data))
  } catch (error) {
    console.log({ 2: error })
  }

  try {
    const usersPath = path.join(process.cwd(), 'tmp/users.json')
    console.log({ usersPath })
    fs.writeFileSync(usersPath, JSON.stringify(data))
  } catch (error) {
    console.log({ 3: error })
  }

  // fs.writeFileSync(usersPath, JSON.stringify(data))
  // const x = new Response(file)
  // console.log({ x })

  return {
    data: [],
    success: false,
    message: 'Unable to update user',
    codeMessage: 'server_error',
  }
}

export default updateUserAction
