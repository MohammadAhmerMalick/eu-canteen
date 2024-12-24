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
import Loading from '@/components/common/Loading'
import EuroChip from '@/components/common/EuroChip'
import DataError from '@/components/common/DataError'
import TableCell from '@/components/common/TableCell'
import TableColumn from '@/components/common/TableColumn'
import AiOutlineEye from '@/components/icons/AiOutlineEye'
import { type OrderSlice } from '@/store/slices/ordersSlice'
import getOrdersAction from '@/actions/orders/getOrdersAction'
import UserCellWidget from '@/components/widgets/UserCellWidget'
import UserOrdersModal from '@/components/modals/order/UserOrdersModal'

interface GroupByDate {
  [key: string]: {
    [userId: string]: OrderSlice[]
  }
}

const dataErrorMessage = 'Unable to load orders'

const OrdersPage = () => {
  const { orders, setOrders } = useStore((state) => state)

  const [tabId, setTabId] = useState<Key>('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [selectedOrders, setSelectedOrders] = useState<OrderSlice[] | null>(
    null
  )

  const { isPending, error } = useQuery({
    queryKey: ['getOrders'],
    queryFn: async () => {
      const { data, success } = await getOrdersAction()
      if (success) setOrders(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  const groupByDate = useMemo(
    () =>
      orders.reduce((group: GroupByDate, orderSlice) => {
        const { userId, createdAt } = orderSlice.order
        if (userId) {
          const date = new Date(createdAt || '')
          const key = date.toLocaleDateString()

          if (!group[key]) group[key] = {}
          if (!group[key][userId]) group[key][userId] = []

          group[key][userId].push(orderSlice)
        }

        return group
      }, {}),
    [orders]
  )

  useEffect(() => {
    const date = new Date(orders[0]?.order.createdAt || '')
    const key = date.toLocaleDateString()

    setTabId(key)
  }, [orders])

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div>
      {selectedOrders && (
        <UserOrdersModal
          orders={selectedOrders}
          isOpen={!!selectedOrders}
          setOpen={() => setSelectedOrders(null)}
        />
      )}
      <Tabs onSelectionChange={setTabId}>
        <TabList
          aria-label="Orders"
          className="neutral- mb-4 flex flex-wrap gap-2 border-b-2 text-sm"
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
              aria-label="Orders"
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
                <TableColumn className="text-left">Products</TableColumn>
                <TableColumn className="text-left">Count</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>

              <TableBody>
                {Object.values(groupByDate[key]).map((sliceOrders) => (
                  <Row key={sliceOrders?.[0]?.user?.id || ''}>
                    <TableCell>
                      {sliceOrders[0].user && (
                        <UserCellWidget user={sliceOrders[0].user} />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex max-h-20 flex-wrap gap-2 overflow-hidden">
                        {sliceOrders.map(
                          ({ product, order }) =>
                            product && (
                              <Chip key={order.id}>{product.name}</Chip>
                            )
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {sliceOrders.length}
                    </TableCell>
                    <TableCell className="text-center">
                      <EuroChip
                        amount={sliceOrders.reduce(
                          (a, { transaction }) =>
                            Number(a) + Number(transaction?.amount),
                          0
                        )}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <AriaButton
                        onPress={() => setSelectedOrders(sliceOrders)}
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

      {!orders.length && (
        <div className="mt-4 space-y-2 text-center">
          <p>No order yet!</p>
        </div>
      )}
    </div>
  )
}

export default OrdersPage
