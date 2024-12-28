'use client'

import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { Row, Table, TableBody, TableHeader } from 'react-aria-components'

import { useStore } from '@/store/provider'
import Loading from '@/components/common/Loading'
import DataError from '@/components/common/DataError'
import TableCell from '@/components/common/TableCell'
import TableColumn from '@/components/common/TableColumn'
import ProductCell from '@/components/widgets/ProductCellWidget'
import getMyOrdersAction from '@/actions/orders/getMyOrdersAction'
import OrderCellWidget from '@/components/widgets/OrderCellWidget'

const dataErrorMessage = 'Unable to load orders'

const OrdersPage = () => {
  const { orders, setOrders } = useStore((state) => state)

  const { isPending, error } = useQuery({
    queryKey: ['getOrders'],
    queryFn: async () => {
      const { data, success } = await getMyOrdersAction()
      if (success) setOrders(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div>
      <div className="block space-y-2 md:hidden">
        {orders.map((orderSlice) => (
          <OrderCellWidget orderSlice={orderSlice} key={orderSlice.order.id} />
        ))}
      </div>

      <Table aria-label="Orders" className="hidden w-full text-sm md:block">
        <TableHeader>
          <TableColumn className="text-left" isRowHeader>
            Product
          </TableColumn>
          <TableColumn className="text-left">Order Type</TableColumn>
          <TableColumn className="text-left">Quantity</TableColumn>
          <TableColumn className="text-left">Placed At</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>

        <TableBody>
          {orders.map(({ order, product }) => (
            <Row key={order.id}>
              <TableCell className="w-1 border-b border-neutral-300 p-2">
                {product && <ProductCell product={product} />}
              </TableCell>
              <TableCell className="border-b border-neutral-300 p-2 text-center">
                {order.type}
              </TableCell>
              <TableCell className="border-b border-neutral-300 p-2 text-center">
                {order.quantity}
              </TableCell>
              <TableCell className="border-b border-neutral-300 p-2 text-center">
                {new Date(order.createdAt || '').toLocaleTimeString()}{' '}
                {new Date(order.createdAt || '').toLocaleDateString()}
              </TableCell>
              <TableCell className="border-b border-neutral-300 p-2 text-center">
                <span className="rounded-lg bg-primary-light p-2 text-primary">
                  €{(parseFloat(order.unitPrice) * order.quantity).toFixed(2)}
                </span>
              </TableCell>
              <TableCell className="border-b border-neutral-300 p-2 text-center">
                {order.status?.toUpperCase()}
              </TableCell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrdersPage
