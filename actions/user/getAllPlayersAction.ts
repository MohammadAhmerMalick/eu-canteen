'use server'

import UserModel from '@/models/UserModel'

const getAllPlayersAction = async () => {
  const players = await UserModel.getAllPlayers()

  console.log({ getAllPlayersAction: 'success' })

  return {
    success: true,
    data: players,
  }
}

export default getAllPlayersAction
