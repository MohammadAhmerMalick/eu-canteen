import UserModel from '@/models/UserModel'
import type { NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`)
    return new Response('Unauthorized', {
      status: 401,
    })

  const stipendValue = 11
  const userCredits = await UserModel.getActiveCredits()

  userCredits.forEach(({ id, credit }) => {
    const newCredit = (parseFloat(credit) + stipendValue).toFixed(4)

    UserModel.updateUserCredit(id, newCredit)
  })

  return Response.json({ success: true })
}

export function POST() {}
