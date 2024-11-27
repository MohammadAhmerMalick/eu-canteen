'use client'

import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/store/provider'
import Loading from '@/components/common/Loading'
import ProductCell from '@/components/ProductCell'
import DataError from '@/components/common/DataError'
import getMyOrdersAction from '@/actions/orders/getMyOrdersAction'

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
      <table className="w-full text-sm">
        <thead>
          <tr>
            <td className="border-b border-neutral-300 p-2">Product</td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Order Type
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Quantity
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Placed At
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Price
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Status
            </td>
          </tr>
        </thead>
        <tbody>
          {orders.map(({ orders: order, products: product }) => (
            <tr key={order.id}>
              <td className="w-1 border-b border-neutral-300 p-2">
                {product && <ProductCell product={product} />}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                {order.type}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                {order.quantity}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                {new Date(order.createdAt || '').toLocaleTimeString()}{' '}
                {new Date(order.createdAt || '').toLocaleDateString()}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                <span className="rounded-lg bg-primary-light p-2 text-primary">
                  €{(parseFloat(order.unitPrice) * order.quantity).toFixed(2)}
                </span>
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                {/* <span className="flex items-center gap-1"> */}
                {/* <AiOutlineFieldTime />
                  <BiDish />
                <AiOutlineCheck />
                <AiOutlineClose /> */}
                {order.status?.toUpperCase()}
                {/* </span> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersPage
