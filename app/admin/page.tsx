'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/store/provider'
import Loading from '@/components/common/Loading'
import DataError from '@/components/common/DataError'
import getOrdersAction from '@/actions/orders/getOrdersAction'
import AnalyticWidget from '@/components/widgets/AnalyticWidget'

const dataErrorMessage = 'Unable to load orders'

const AdminDashboardPage = () => {
  const { setOrders } = useStore((state) => state)
  const [orderObject, setOrderObject] = useState({
    recieved: { quantity: 0, cost: 0 },
    completed: { quantity: 0, cost: 0 },
    canceled: { quantity: 0, cost: 0 },
  })

  const { isPending, error } = useQuery({
    queryKey: ['getOrders'],
    queryFn: async () => {
      const { data, success } = await getOrdersAction()

      if (success) {
        const obj = orderObject

        data.forEach(({ order, transaction }) => {
          obj.recieved.quantity += 1
          obj.recieved.cost += parseFloat(transaction?.amount || '0')

          if (order.status === 'completed') {
            obj.completed.quantity += 1
            obj.completed.cost += parseFloat(transaction?.amount || '0')
          } else if (order.status === 'canceled') {
            obj.canceled.quantity += 1
            obj.canceled.cost += parseFloat(transaction?.amount || '0')
          }
        })

        setOrderObject(obj)
        setOrders(data)
      } else toast.error(dataErrorMessage)
      return data
    },
  })

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnalyticWidget
          title="Total Order Recieved"
          cost={orderObject.recieved.cost}
          quantity={orderObject.recieved.quantity}
          image="/images/dashboard/total-order-received.svg"
        />

        <AnalyticWidget
          title="Total Order Completed"
          cost={orderObject.completed.cost}
          quantity={orderObject.completed.quantity}
          image="/images/dashboard/total-order-completed.svg"
        />

        <AnalyticWidget
          title="Total Cancled"
          cost={orderObject.canceled.cost}
          quantity={orderObject.canceled.quantity}
          image="/images/dashboard/total-order-cancled.svg"
        />
      </div>
    </div>
  )
}

export default AdminDashboardPage
