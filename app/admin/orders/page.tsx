'use client'

import {
  Row,
  Table,
  Column,
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
    updateOrderStatusAction({ id: order.id || '', status })
  }

  const bulkAction = (status: string) => {
    setBulkOptionId(status)

    orders
      .filter(
        ({ orders: order }) =>
          [...selectedKeys].includes(order.id || '') || selectedKeys === 'all'
      )
      .map(({ orders: order }) => onOrderStatusChange(order, status))

    setSelectedKeys(new Set())
  }

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div>
      <Table
        aria-label="Files"
        selectionMode="multiple"
        className="w-full"
        onRowAction={(e) => console.log(e)}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <Column className="text-center">
            <Checkbox slot="selection" className="mx-auto" />
          </Column>

          <Column isRowHeader className="border-b border-neutral-300 p-2">
            Student
          </Column>
          <Column className="border-b border-neutral-300 p-2">Product</Column>
          <Column className="border-b border-neutral-300 p-2 text-center">
            Order Type
          </Column>
          <Column className="border-b border-neutral-300 p-2 text-center">
            Quantity
          </Column>
          <Column className="border-b border-neutral-300 p-2 text-center">
            Placed At
          </Column>
          <Column className="border-b border-neutral-300 p-2 text-center">
            Price
          </Column>
          <Column className="border-b border-neutral-300 p-2 text-center">
            Status
          </Column>
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
                {/* <span className="flex items-center gap-1">
                  <Select
                    id="categoryId"
                    value={order.status || 'pending'}
                    labelClassName="mx-auto"
                    onChange={({ value }) => onOrderStatusChange(order, value)}
                    options={orderStatusOptions.map(({ id, name }) => ({
                      text: name,
                      key: id || '',
                      value: id || '',
                    }))}
                  />
                </span> */}
              </TableCell>
            </Row>
          ))}
        </TableBody>
      </Table>

      <Select1
        items={orderStatusOptions}
        placeholder="Order Status"
        selectedKey={bulkOptionId}
        onSelectionChange={(value) => bulkAction(value as string)}
      />
    </div>
  )
}

export default OrdersPage
