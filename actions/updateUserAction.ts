'use server'

import fs from 'fs'
import path from 'path'

const updateUserAction = async (formData: FormData) => {
  const usersPath = path.join(process.cwd(), 'tmp/users.json')
  const data = { x: 'x' }

  console.log({ data, usersPath })
  // const file =
  fs.writeFileSync(usersPath, JSON.stringify(data))
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
