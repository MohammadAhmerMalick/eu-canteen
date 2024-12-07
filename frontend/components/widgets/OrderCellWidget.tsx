import Image from 'next/image'

import { classnames } from '@/utils'
import { type OrderSlice } from '@/store/slices/ordersSlice'

interface OrderCellWidgetProps {
  orderSlice: OrderSlice
}

const OrderCellWidget = ({ orderSlice }: OrderCellWidgetProps) => {
  const { order, product, transaction } = orderSlice

  if (product && transaction)
    return (
      <div className="w-max min-w-full max-w-80 rounded-lg bg-primary-light px-4 py-2">
        {orderSlice.order && (
          <div className="flex gap-4">
            <Image
              alt={product.name}
              width={52}
              height={52}
              src="/images/products/p-1.png"
              className={classnames(
                'rounded-full border-2',
                product.published ? 'border-primary' : 'border-neutral-400'
              )}
            />
            <div className="text-xs">
              <p className="text-sm font-semibold">{product.name}</p>
              <p>
                Price: <span className="font-semibold">€{product.price}</span>
              </p>
              <p>
                Price: <span className="font-semibold">€{order.quantity}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    )

  return <div />
}

export default OrderCellWidget
