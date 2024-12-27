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
import { type OrderSlice } from '@/store/slices/ordersSlice'
import UserCellWidget from '@/components/widgets/UserCellWidget'
import DateRangePicker from '@/components/common/DateRangePicker'
import UserOrdersModal from '@/components/modals/order/UserOrdersModal'
import getOrdersByDateAction from '@/actions/orders/getOrdersByDateAction'

interface GroupByDate {
  [key: string]: {
    [userId: string]: OrderSlice[]
  }
}

const dataErrorMessage = 'Unable to load orders'

const OrdersPage = () => {
  const { orders, setOrders } = useStore((state) => state)

  const [range, setRange] = useState<DateRange | null>({
    end: today(getLocalTimeZone()),
    start: today(getLocalTimeZone()),
  })

  const [selectedOrders, setSelectedOrders] = useState<OrderSlice[] | null>(
    null
  )

  const { isPending, error, refetch, isRefetching } = useQuery({
    queryKey: ['getOrders'],
    queryFn: async () => {
      const { data, success } = await getOrdersByDateAction({
        dateRange: {
          start: new Date(range?.start.toString() || ''),
          end: new Date(range?.end.toString() || ''),
        },
      })
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
    refetch()
  }, [range])

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

      <div className="mb-4 flex items-center justify-end gap-2 text-sm">
        <span>Select Range</span>
        <DateRangePicker range={range} setRange={setRange} />
      </div>

      <Table
        aria-label="Orders"
        onRowAction={() => {}}
        className="w-full text-sm"
      >
        <TableHeader>
          <TableColumn className="text-left" isRowHeader>
            Student
          </TableColumn>
          <TableColumn className="text-left">Products</TableColumn>
          <TableColumn className="text-left">Count</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>

        <TableBody className={classnames(isRefetching && 'hidden')}>
          {Object.keys(groupByDate).map((key: string) =>
            Object.values(groupByDate[key]).map((sliceOrders) => (
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
                        product && <Chip key={order.id}>{product.name}</Chip>
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
                  {sliceOrders[0].order.createdAt?.toDateString()}
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
            ))
          )}
        </TableBody>
      </Table>

      {isPending || isRefetching ? (
        <Loading className="mt-4" />
      ) : (
        !orders.length && (
          <div className="mt-4 space-y-2 text-center">
            <p>No orders yet!</p>
          </div>
        )
      )}
    </div>
  )
}

export default OrdersPage
