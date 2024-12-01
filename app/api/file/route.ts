import fs from 'fs'
import path from 'path'

export const GET = () => {
  const usersPath = path.join(process.cwd(), 'tmp/users.json')
  const data = { x: 'x' }

  console.log({ data, usersPath })
  // const file =

  if (!fs.existsSync(usersPath)) fs.mkdirSync('tmp', { recursive: true })

  fs.writeFileSync(usersPath, JSON.stringify(data))

  return Response.json({ x: 'x' })
}
export const Post = () => {}
