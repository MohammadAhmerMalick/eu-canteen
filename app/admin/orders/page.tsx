'use client'

import {
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from 'react-aria-components'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/store/provider'
import Loading from '@/components/common/Loading'
import StudentCell from '@/components/StudentCell'
import ProductCell from '@/components/ProductCell'
// import { Orders } from '@/store/slices/ordersSlice'
import Checkbox from '@/components/common/Checkbox'
import DataError from '@/components/common/DataError'
import TableCell from '@/components/common/TableCell'
import { Select1 } from '@/components/common/Select1'
import AiOutlineEdit from '@/components/icons/AiOutlineEdit'
import getOrdersAction from '@/actions/orders/getOrderssAction'
// import updateOrderStatusAction from '@/actions/orders/updateOrderStatusAction'

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
  const {
    orders,
    setOrders,
    // updateOrderStatus
  } = useStore((state) => state)

  const { isPending, error } = useQuery({
    queryKey: ['getOrders'],
    queryFn: async () => {
      const { data, success } = await getOrdersAction()
      if (success) setOrders(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  // const onOrderStatusChange = (order: Orders['orders'], status: string) => {
  //   updateOrderStatus({ ...order, status })
  //   updateOrderStatusAction({ id: order.id || '', status })
  // }

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div>
      <Table
        aria-label="Files"
        selectionMode="multiple"
        className="w-full"
        onRowAction={(e) => {
          console.log(e)
        }}
      >
        <TableHeader>
          <Column>
            <Checkbox slot="selection" />
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
          <Column className="border-b border-neutral-300 p-2 text-center">
            Actions
          </Column>
        </TableHeader>
        <TableBody>
          {orders.map(({ orders: order, products: product, users: user }) => (
            <Row key={order.id}>
              <TableCell>
                <Checkbox slot="selection" />
              </TableCell>
              <TableCell>{user && <StudentCell student={user} />}</TableCell>
              <TableCell>
                {product && <ProductCell product={product} />}
              </TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>
                {new Date(order.createdAt || '').toLocaleDateString()}{' '}
                {new Date(order.createdAt || '').toLocaleTimeString()}
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
                  selectedKey={order.status || orderStatusOptions[0].id}
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
              <TableCell>
                <button
                  onClick={() => {}}
                  className="mx-1 rounded-lg bg-yellow-200 p-2 text-lg text-yellow-600 shadow"
                >
                  <AiOutlineEdit />
                </button>
              </TableCell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrdersPage
