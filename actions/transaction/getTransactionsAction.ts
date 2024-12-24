'use server'

import { auth } from '@/auth'
import { CONSTANTS } from '@/utils'
import TransactionModel from '@/models/TransactionModel'
import { type TransactionSlice } from '@/store/slices/transactionsSlice'

const getTransactionsAction = async () => {
  try {
    const session = await auth()

    let transactions: TransactionSlice[] = []

    if (session?.user.role === CONSTANTS.roleName.admin)
      transactions = await TransactionModel.getTransactions()

    console.log({ getTransactionsAction: 'success' })

    return {
      data: transactions,
      success: true,
    }
  } catch (error) {
    console.log({ getTransactionsAction: error })

    return {
      data: [],
      success: false,
    }
  }
}

export default getTransactionsAction
