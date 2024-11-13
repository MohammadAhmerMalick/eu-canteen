import Image from 'next/image'
import { toast } from 'react-toastify'
import { FormEvent, type MouseEvent } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Button from '@/components/common/Button'
import productsTable from '@/database/schema/productsSchema'
import deleteProductAction from '@/actions/product/deleteProductAction'

interface DeleteProductModalProp {
  onClose(): any
  product: typeof productsTable.$inferInsert
}

const DeleteProductModal = ({ onClose, product }: DeleteProductModalProp) => {
  const { deleteProduct } = useStore((state) => state)

  const onContainerClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => e.currentTarget === e.target && onClose()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append('id', product.id?.toString() || '')

    const { success, data } = await deleteProductAction(formData)
    if (success) {
      deleteProduct(data[0].id)
      toast.success('Student Deleted')
      onClose()
    } else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <div
      aria-hidden
      onClick={onContainerClick}
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-neutral-900/40 p-3 backdrop-blur-sm md:p-4"
    >
      <form
        onSubmit={onSubmit}
        className={classnames(
          'grid max-h-full w-full max-w-xl gap-4 overflow-hidden rounded-lg bg-white p-3 shadow-lg md:mt-0 md:p-6'
        )}
      >
        <h1 className="text-lg font-semibold">Delete Product</h1>
        <div className="grid grid-cols-2 gap-2">
          <Image
            alt={product.name}
            width={200}
            height={200}
            src={`/images/products/${product.image}`}
            className={classnames(
              'rounded-full border-2',
              product.published ? 'border-primary' : 'border-neutral-400'
            )}
          />
          <div className="grid h-min gap-2">
            <p>
              <span className="text-primary">Name:</span> {product.name}
            </p>
            <p>
              <span className="text-primary">Stock:</span> {product.stock}
            </p>
            <p>
              <span className="text-primary">Price:</span> {product.price}
            </p>
            <p>
              <span className="text-primary">Description:</span>{' '}
              {product.description}
            </p>
            <p>
              <span className="text-primary">Status</span>:{' '}
              {product.published ? (
                <span className="text-green-700">Active</span>
              ) : (
                <span className="text-red-700">Inactive</span>
              )}
            </p>
          </div>
        </div>
        <Button className="ml-auto w-max !py-1">Delete Product</Button>
      </form>
    </div>
  )
}

export default DeleteProductModal
