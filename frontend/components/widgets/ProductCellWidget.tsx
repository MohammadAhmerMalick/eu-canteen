import Image from 'next/image'

import { classnames, CONSTANTS } from '@/utils'
import type { Product } from '@/database/schema/productsSchema'

interface ProductCellWidgetProps {
  product: Product
}

const ProductCellWidget = ({ product }: ProductCellWidgetProps) => {
  return (
    <div className="w-max min-w-full max-w-80 rounded-lg bg-primary-light p-2">
      <div className="flex gap-4">
        <Image
          alt={product.name}
          width={52}
          height={52}
          src={CONSTANTS.imagePlaceholders.product}
          className={classnames(
            'rounded-full border-2',
            product.published ? 'border-primary' : 'border-neutral-400'
          )}
        />
        <div className="text-xs">
          <p className="text-sm font-semibold">{product.name}</p>
          <p>
            Price:{' '}
            <span className="font-semibold">
              €{parseFloat(product.price).toFixed(2)}
            </span>
          </p>
          <p className="line-clamp-1">
            <span className="font-semibold">{product.description}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCellWidget
