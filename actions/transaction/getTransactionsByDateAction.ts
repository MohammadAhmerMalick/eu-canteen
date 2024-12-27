'use server'

import { auth } from '@/auth'
import { CONSTANTS } from '@/utils'
import TransactionModel from '@/models/TransactionModel'
import { type TransactionSlice } from '@/store/slices/transactionsSlice'

interface getTransactionsByDateActionProps {
  dateRange: {
    start: Date
    end: Date
  }
}

const getTransactionsByDateAction = async ({
  dateRange,
}: getTransactionsByDateActionProps) => {
  try {
    const session = await auth()

    let transactions: TransactionSlice[] = []

    dateRange.end.setDate(new Date(dateRange.end).getDate() + 1)

    if (session?.user.role === CONSTANTS.roleName.admin)
      transactions = await TransactionModel.getTransactionsByDate(
        dateRange.start,
        dateRange.end
      )

    console.log({ getTransactionsByDateAction: 'success' })

    return {
      data: transactions,
      success: true,
    }
  } catch (error) {
    console.log({ getTransactionsByDateAction: error })

    return {
      data: [],
      success: false,
    }
  }
}

export default getTransactionsByDateAction
