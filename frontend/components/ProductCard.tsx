import Image from 'next/image'

import { CONSTANTS } from '@/utils'
import Button from '@/components/common/Button'
import { assetsBaseUrl } from '@/libs/assetsManagement'
import { type Product } from '@/database/schema/productsSchema'

interface ProductCardProps {
  product: Product
  onPress: () => void
}

const ProductCard = ({ product, onPress }: ProductCardProps) => {
  return (
    <div className="mx-auto grid w-full max-w-72 gap-5 rounded-3xl bg-white p-2 shadow-sm duration-300 hover:shadow-lg">
      <div className="flex rounded-3xl bg-primary-light p-2 shadow">
        <Image
          width={140}
          height={112}
          alt={product.name}
          className="m-auto max-h-28 object-contain"
          src={
            product.image
              ? `${assetsBaseUrl}${product.image}`
              : CONSTANTS.imagePlaceholders.product
          }
        />
      </div>

      <div className="grid gap-1 px-6">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-sm">{product.description}</p>
        <span className="text-2xl">€{Number(product.price).toFixed(2)}</span>
      </div>
      <Button
        className="mx-2 mb-2 rounded-b-3xl rounded-t-md"
        onPress={onPress}
      >
        Buy Now
      </Button>
    </div>
  )
}

export default ProductCard
