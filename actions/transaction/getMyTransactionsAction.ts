'use server'

import { auth } from '@/auth'
import TransactionModel from '@/models/TransactionModel'
import { Transactions } from '@/store/slices/transactionsSlice'

const getMyTransactionsAction = async (): Promise<
  | {
      data: Transactions[]
      success: true
    }
  | {
      data: null
      success: false
    }
> => {
  try {
    const session = await auth()

    const transactions = await TransactionModel.getTransactionsByUserId(
      session?.user.id || ''
    )

    console.log({ getMyTransactionsAction: 'success' })

    return {
      data: transactions,
      success: true,
    }
  } catch (error) {
    console.log({ getMyTransactionsAction: error })

    return {
      data: null,
      success: false,
    }
  }
}

export default getMyTransactionsAction
