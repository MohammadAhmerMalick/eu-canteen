'use client'

import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/store/provider'
import Loading from '@/components/common/Loading'
import StudentCell from '@/components/StudentCell'
import ProductCell from '@/components/ProductCell'
import DataError from '@/components/common/DataError'
import AiOutlineEdit from '@/components/icons/AiOutlineEdit'
import getOrdersAction from '@/actions/orders/getOrderssAction'

const dataErrorMessage = 'Unable to load orders'

const OrdersPage = () => {
  const { orders, setOrders } = useStore((state) => state)

  const { isPending, error } = useQuery({
    queryKey: ['getOrders'],
    queryFn: async () => {
      const { data, success } = await getOrdersAction()
      if (success) setOrders(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  console.log({ orders })

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <td className="border-b border-neutral-300 p-2">Student</td>
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
            <td className="border-b border-neutral-300 p-2 text-center">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {orders.map(({ orders: order, products: product, users: user }) => (
            <tr key={order.id}>
              <td className="w-1 border-b border-neutral-300 p-2">
                {user && <StudentCell student={user} />}
              </td>
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
                {new Date(order.createdAt || '').toLocaleDateString()}{' '}
                {new Date(order.createdAt || '').toLocaleTimeString()}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                <span className="rounded-lg bg-primary-light p-2 text-primary">
                  €{(parseFloat(order.unitPrice) * order.quantity).toFixed(2)}
                </span>
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                <span className="flex items-center gap-1">
                  {/* <AiOutlineFieldTime />
                  <BiDish />
                <AiOutlineCheck />
                <AiOutlineClose /> */}
                  Waiting
                </span>
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                <button
                  onClick={() => {}}
                  className="mx-1 rounded-lg bg-yellow-200 p-2 text-lg text-yellow-600 shadow"
                >
                  <AiOutlineEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersPage
