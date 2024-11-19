import Image from 'next/image'

import { classnames } from '@/utils'
import productsTable from '@/database/schema/productsSchema'

interface ProductCellProps {
  product: typeof productsTable.$inferInsert
}

const ProductCell = ({ product }: ProductCellProps) => {
  return (
    <div className="w-max max-w-80 rounded-lg bg-primary-light px-4 py-2">
      <div className="flex gap-4">
        <Image
          alt={product.name}
          width={70}
          height={70}
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
          <p>Stock: {product.stock}</p>
          <p className="line-clamp-1">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCell
