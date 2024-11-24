'use client'

import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/store/provider'
import Loading from '@/components/common/Loading'
import ProductCell from '@/components/ProductCell'
import DataError from '@/components/common/DataError'
import getMyTransactionsAction from '@/actions/transaction/getMyTransactionsAction'

const dataErrorMessage = 'Unable to load orders'

const CreditsPage = () => {
  const { transactions, setTransactions } = useStore((state) => state)

  const { isPending, error } = useQuery({
    queryKey: ['getOrders'],
    queryFn: async () => {
      const { data, success } = await getMyTransactionsAction()
      if (success) setTransactions(data)
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
            <td className="border-b border-neutral-300 p-2">Amount</td>
            <td className="border-b border-neutral-300 p-2">description</td>
            <td className="border-b border-neutral-300 p-2">Type</td>
            <td className="border-b border-neutral-300 p-2">Date/Time</td>
            <td className="border-b border-neutral-300 p-2">Reference</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map(
            ({ transactions: transaction, products: product }) => (
              <tr key={transaction.id}>
                <td className="border-b border-neutral-300 p-2">
                  <span className="rounded-lg bg-primary-light p-2 text-primary">
                    €{parseFloat(transaction.amount).toFixed(2)}
                  </span>
                </td>
                <td className="border-b border-neutral-300 p-2">
                  {transaction.description}
                </td>
                <td className="border-b border-neutral-300 p-2">
                  {transaction.type.toUpperCase()}
                </td>
                <td className="border-b border-neutral-300 p-2">
                  {new Date(transaction.createdAt || '').toLocaleDateString()}{' '}
                  {new Date(transaction.createdAt || '').toLocaleTimeString()}
                </td>
                <td className="w-1 border-b border-neutral-300 p-2">
                  {product && <ProductCell product={product} />}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CreditsPage
