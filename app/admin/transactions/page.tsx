'use client'

import {
  Row,
  Table,
  TableBody,
  TableHeader,
  Button as AriaButton,
  type DateRange,
} from 'react-aria-components'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { today, getLocalTimeZone } from '@internationalized/date'

import { classnames } from '@/utils'
import Chip from '@/components/common/Chip'
import { useStore } from '@/store/provider'
import Loading from '@/components/common/Loading'
import EuroChip from '@/components/common/EuroChip'
import DataError from '@/components/common/DataError'
import TableCell from '@/components/common/TableCell'
import TableColumn from '@/components/common/TableColumn'
import AiOutlineEye from '@/components/icons/AiOutlineEye'
import UserCellWidget from '@/components/widgets/UserCellWidget'
import DateRangePicker from '@/components/common/DateRangePicker'
import { type TransactionSlice } from '@/store/slices/transactionsSlice'
import UserTransactionsModal from '@/components/modals/transaction/UserTransactionsModal'
import getTransactionsByDateAction from '@/actions/transaction/getTransactionsByDateAction'

interface GroupByDate {
  [key: string]: {
    [userId: string]: TransactionSlice[]
  }
}

const dataErrorMessage = 'Unable to load transactions'

const TransactionPage = () => {
  const { transactions, setTransactions } = useStore((state) => state)

  const [range, setRange] = useState<DateRange | null>({
    end: today(getLocalTimeZone()),
    start: today(getLocalTimeZone()),
  })

  const [selectedTransactions, setSelectedTransactions] = useState<
    TransactionSlice[] | null
  >(null)

  const { isPending, error, refetch, isRefetching } = useQuery({
    queryKey: ['getTransactions'],
    queryFn: async () => {
      const { data, success } = await getTransactionsByDateAction({
        dateRange: {
          start: new Date(range?.start.toString() || ''),
          end: new Date(range?.end.toString() || ''),
        },
      })
      if (success) setTransactions(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  const groupByDate = useMemo(
    () =>
      transactions.reduce((group: GroupByDate, transactionSlice) => {
        const { userId, createdAt } = transactionSlice.transaction
        if (userId) {
          const date = new Date(createdAt || '')
          const key = date.toLocaleDateString()

          if (!group[key]) group[key] = {}
          if (!group[key][userId]) group[key][userId] = []

          group[key][userId].push(transactionSlice)
        }

        return group
      }, {}),
    [transactions]
  )

  useEffect(() => {
    refetch()
  }, [range])

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div>
      {selectedTransactions && (
        <UserTransactionsModal
          transactions={selectedTransactions}
          isOpen={!!selectedTransactions}
          setOpen={() => setSelectedTransactions(null)}
        />
      )}

      <div className="mb-4 flex items-center justify-end gap-2 text-sm">
        <span>Select Range</span>
        <DateRangePicker range={range} setRange={setRange} />
      </div>

      <Table
        aria-label="Transactions"
        onRowAction={() => {}}
        className="w-full text-sm"
      >
        <TableHeader>
          <TableColumn className="text-left" isRowHeader>
            Student
          </TableColumn>
          <TableColumn className="hidden text-left md:table-cell">
            Products
          </TableColumn>
          <TableColumn className="hidden text-left md:table-cell">
            Count
          </TableColumn>
          <TableColumn>Spent</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>

        <TableBody className={classnames(isRefetching && 'hidden')}>
          {Object.keys(groupByDate).map((key: string) =>
            Object.values(groupByDate[key]).map((sliceTransactions) => (
              <Row key={sliceTransactions?.[0]?.user?.id || ''}>
                <TableCell>
                  {sliceTransactions[0].user && (
                    <UserCellWidget user={sliceTransactions[0].user} />
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex max-h-20 flex-wrap gap-2 overflow-hidden">
                    {sliceTransactions.map(
                      ({ product, transaction }) =>
                        product && (
                          <Chip key={transaction.id}>{product.name}</Chip>
                        )
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                  {sliceTransactions.length}
                </TableCell>
                <TableCell className="text-center">
                  <EuroChip
                    amount={sliceTransactions.reduce(
                      (a, { transaction }) =>
                        Number(a) + Number(transaction?.amount),
                      0
                    )}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <AriaButton
                    onPress={() => setSelectedTransactions(sliceTransactions)}
                    className="mx-1 rounded-lg bg-green-200 p-2 text-lg text-green-600 shadow"
                  >
                    <AiOutlineEye />
                  </AriaButton>
                </TableCell>
              </Row>
            ))
          )}
        </TableBody>
      </Table>

      {isPending || isRefetching ? (
        <Loading className="mt-4" />
      ) : (
        !transactions.length && (
          <div className="mt-4 space-y-2 text-center">
            <p>No transaction yet!</p>
          </div>
        )
      )}
    </div>
  )
}

export default TransactionPage
