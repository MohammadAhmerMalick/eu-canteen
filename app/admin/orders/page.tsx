'use client'

import {
  Row,
  Table,
  TableBody,
  TableHeader,
  type Selection,
} from 'react-aria-components'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/store/provider'
import MenuPopup from '@/components/common/Menu'
import Loading from '@/components/common/Loading'
import EuroChip from '@/components/common/EuroChip'
import MenuItem from '@/components/common/MenuItem'
import Checkbox from '@/components/common/Checkbox'
import DataError from '@/components/common/DataError'
import TableCell from '@/components/common/TableCell'
import { Select1 } from '@/components/common/Select1'
import TableColumn from '@/components/common/TableColumn'
import { type OrderSlice } from '@/store/slices/ordersSlice'
import getOrdersAction from '@/actions/orders/getOrderssAction'
import StudentCellWidget from '@/components/widgets/StudentCellWidget'
import ProductCellWidget from '@/components/widgets/ProductCellWidget'
import updateOrdersStatusAction from '@/actions/orders/updateOrdersStatusAction'

const dataErrorMessage = 'Unable to load orders'

const orderStatusOptions = [
  {
    id: 'pending',
    name: 'Pending',
  },
  {
    id: 'ready',
    name: 'Ready',
  },
  {
    id: 'canceled',
    name: 'Canceled',
  },
  {
    id: 'completed',
    name: 'Completed',
  },
]

const OrdersPage = () => {
  const { orders, setOrders, updateOrdersStatus } = useStore((state) => state)
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  const { isPending, error } = useQuery({
    queryKey: ['getOrders'],
    queryFn: async () => {
      const { data, success } = await getOrdersAction()
      if (success) setOrders(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  const onOrderStatusChange = (order: OrderSlice['order'], status: string) => {
    updateOrdersStatus({ ...order, id: order.id || '', status })
    updateOrdersStatusAction({ ids: [order.id || ''], status })
  }

  const bulkAction = (status: string) => {
    const updatedOrders = orders.filter(
      ({ order }) =>
        [...selectedKeys].includes(order.id || '') || selectedKeys === 'all'
    )

    updatedOrders.map(({ order }) =>
      updateOrdersStatus({ ...order, id: order.id || '', status })
    )

    const updatedOrdersIds = updatedOrders
      .map((o) => o.order.id || '')
      .filter((x) => x)

    updateOrdersStatusAction({
      ids: updatedOrdersIds,
      status,
    })

    setSelectedKeys(new Set())
  }

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div>
      <Table
        className="w-full"
        aria-label="Orders"
        onRowAction={() => {}}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <TableColumn>
            <Checkbox slot="selection" />
          </TableColumn>
          <TableColumn isRowHeader className="">
            <div className="flex items-center gap-4">
              {[...selectedKeys].length ? (
                <MenuPopup>
                  {orderStatusOptions.map(({ id, name }) => (
                    <MenuItem key={id} onAction={() => bulkAction(id)}>
                      {name}
                    </MenuItem>
                  ))}
                </MenuPopup>
              ) : (
                ''
              )}
              Student
            </div>
          </TableColumn>
          <TableColumn className="text-left">Product</TableColumn>
          <TableColumn>Order Type</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn>Placed At</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map(({ order, product, user }) => (
            <Row key={order.id} id={order.id}>
              <TableCell className="text-center">
                <Checkbox slot="selection" />
              </TableCell>
              <TableCell>
                {user && <StudentCellWidget student={user} />}
              </TableCell>
              <TableCell>
                {product && <ProductCellWidget product={product} />}
              </TableCell>
              <TableCell className="text-center capitalize">
                {order.type.replaceAll(' ', '-')}
              </TableCell>
              <TableCell className="text-center">{order.quantity}</TableCell>
              <TableCell className="text-center">
                {new Date(order.createdAt || '').toLocaleTimeString()}{' '}
                {new Date(order.createdAt || '').toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                <EuroChip
                  amount={(
                    parseFloat(order.unitPrice) * order.quantity
                  ).toString()}
                />
              </TableCell>
              <TableCell>
                <Select1
                  items={orderStatusOptions}
                  placeholder="Order Status"
                  selectedKey={order.status}
                  onSelectionChange={(value) =>
                    onOrderStatusChange(order, value as string)
                  }
                />
              </TableCell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrdersPage
