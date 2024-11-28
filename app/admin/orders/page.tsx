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
import Loading from '@/components/common/Loading'
import StudentCell from '@/components/StudentCell'
import ProductCell from '@/components/ProductCell'
import Checkbox from '@/components/common/Checkbox'
import DataError from '@/components/common/DataError'
import TableCell from '@/components/common/TableCell'
import { Select1 } from '@/components/common/Select1'
import { type Orders } from '@/store/slices/ordersSlice'
import TableColumn from '@/components/common/TableColumn'
import getOrdersAction from '@/actions/orders/getOrderssAction'
import updateOrderStatusAction from '@/actions/orders/updateOrderStatusAction'

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
  const { orders, setOrders, updateOrderStatus } = useStore((state) => state)
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [bulkOptionId, setBulkOptionId] = useState(orderStatusOptions[0].id)

  const { isPending, error } = useQuery({
    queryKey: ['getOrders'],
    queryFn: async () => {
      const { data, success } = await getOrdersAction()
      if (success) setOrders(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  const onOrderStatusChange = (order: Orders['orders'], status: string) => {
    updateOrderStatus({ ...order, id: order.id || '', status })
    updateOrderStatusAction({ ids: [order.id || ''], status })
  }

  const bulkAction = (status: string) => {
    setBulkOptionId(status)

    const updatedOrders = orders.filter(
      ({ orders: order }) =>
        [...selectedKeys].includes(order.id || '') || selectedKeys === 'all'
    )

    updatedOrders.map(({ orders: order }) =>
      updateOrderStatus({ ...order, id: order.id || '', status })
    )

    const updatedOrdersIds = updatedOrders
      .map((o) => o.orders.id || '')
      .filter((x) => x)

    updateOrderStatusAction({
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
        aria-label="Orders"
        selectionMode="multiple"
        className="w-full"
        onRowAction={(e) => console.log(e)}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <TableColumn className="text-left">
            <Checkbox slot="selection" className="mx-auto" />
          </TableColumn>
          <TableColumn isRowHeader className="flex items-center gap-2">
            <Select1
              items={orderStatusOptions}
              placeholder="Order Status"
              selectedKey={bulkOptionId}
              onSelectionChange={(value) => bulkAction(value as string)}
            />
            Student
          </TableColumn>
          <TableColumn className="text-left">Product</TableColumn>
          <TableColumn>Order Type</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn>Placed At</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map(({ orders: order, products: product, users: user }) => (
            <Row key={order.id} id={order.id}>
              <TableCell className="text-center">
                <Checkbox slot="selection" />
              </TableCell>
              <TableCell>{user && <StudentCell student={user} />}</TableCell>
              <TableCell>
                {product && <ProductCell product={product} />}
              </TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>
                {new Date(order.createdAt || '').toLocaleTimeString()}{' '}
                {new Date(order.createdAt || '').toLocaleDateString()}
              </TableCell>
              <TableCell>
                <span className="rounded-lg bg-primary-light p-2 text-primary">
                  €{(parseFloat(order.unitPrice) * order.quantity).toFixed(2)}
                </span>
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
