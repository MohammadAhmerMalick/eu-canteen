'use client'

import {
  Row,
  Tab,
  Tabs,
  Table,
  TabList,
  TabPanel,
  TableBody,
  TableHeader,
  Button as AriaButton,
  type Selection,
  type Key,
} from 'react-aria-components'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { classnames } from '@/utils'
import Chip from '@/components/common/Chip'
import { useStore } from '@/store/provider'
import BiDish from '@/components/icons/BiDish'
import Loading from '@/components/common/Loading'
import EuroChip from '@/components/common/EuroChip'
import DataError from '@/components/common/DataError'
import TableCell from '@/components/common/TableCell'
import TableColumn from '@/components/common/TableColumn'
import AiOutlineEye from '@/components/icons/AiOutlineEye'
import StudentCellWidget from '@/components/widgets/StudentCellWidget'
import { type TransactionSlice } from '@/store/slices/transactionsSlice'
import getTransactionsAction from '@/actions/transaction/getTransactionsAction'
import UserTransactionsModal from '@/components/modals/transaction/UserTransactionsModal'

interface GroupByDate {
  [key: string]: {
    [userId: string]: TransactionSlice[]
  }
}

const dataErrorMessage = 'Unable to load transactions'

const TransactionPage = () => {
  const { transactions, setTransactions } = useStore((state) => state)

  const [tabId, setTabId] = useState<Key>('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [selectedTransactions, setSelectedTransactions] = useState<
    TransactionSlice[] | null
  >(null)

  const { isPending, error } = useQuery({
    queryKey: ['getTransactions'],
    queryFn: async () => {
      const { data, success } = await getTransactionsAction()
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
    const date = new Date(transactions[0]?.transaction.createdAt || '')
    const key = date.toLocaleDateString()

    setTabId(key)
  }, [transactions])

  if (isPending) return <Loading />

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
      <Tabs onSelectionChange={setTabId}>
        <TabList
          aria-label="Transactions"
          className="neutral- btransaction-b-2 mb-4 flex flex-wrap gap-2 text-sm"
        >
          {Object.keys(groupByDate).map((key: string) => (
            <Tab
              id={key}
              key={key}
              className={classnames(
                'inline-block cursor-pointer rounded-t-lg px-3 py-2',
                tabId === key
                  ? 'bg-primary-light text-primary'
                  : 'bg-transparent'
              )}
            >
              {key}
            </Tab>
          ))}
        </TabList>

        {Object.keys(groupByDate).map((key: string) => (
          <TabPanel id={key} key={key}>
            <Table
              aria-label="Transactions"
              onRowAction={() => {}}
              selectionMode="multiple"
              className="w-full text-sm"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <TableHeader>
                <TableColumn className="text-left" isRowHeader>
                  Student
                </TableColumn>
                <TableColumn className="hidden text-left md:block">
                  Products
                </TableColumn>
                <TableColumn className="hidden text-left md:block">
                  <BiDish /> Count
                </TableColumn>
                <TableColumn>Spent</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>

              <TableBody>
                {Object.values(groupByDate[key]).map((sliceTransactions) => (
                  <Row key={sliceTransactions?.[0]?.user?.id || ''}>
                    <TableCell>
                      {sliceTransactions[0].user && (
                        <StudentCellWidget
                          student={sliceTransactions[0].user}
                        />
                      )}
                    </TableCell>
                    <TableCell className="hidden md:block">
                      <div className="flex max-h-20 flex-wrap gap-2 overflow-hidden">
                        {sliceTransactions.map(
                          ({ product, transaction }) =>
                            product && (
                              <Chip key={transaction.id}>{product.name}</Chip>
                            )
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-center md:block">
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
                        onPress={() =>
                          setSelectedTransactions(sliceTransactions)
                        }
                        className="mx-1 rounded-lg bg-green-200 p-2 text-lg text-green-600 shadow"
                      >
                        <AiOutlineEye />
                      </AriaButton>
                    </TableCell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  )
}

export default TransactionPage
