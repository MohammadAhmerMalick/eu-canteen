import Image from 'next/image'
import { FormEvent } from 'react'
import { toast } from 'react-toastify'
import type { Dispatch, SetStateAction } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Button from '@/components/common/Button'
import { assetsBaseUrl } from '@/libs/assetsManagement'
import type { Product } from '@/database/schema/productsSchema'
import ModalContainer from '@/components/common/ModalContainer'
import deleteProductAction from '@/actions/product/deleteProductAction'

interface DeleteProductModalProp {
  isOpen: boolean
  product: Product
  setOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteProductModal = ({
  isOpen,
  setOpen,
  product,
}: DeleteProductModalProp) => {
  const { deleteProduct } = useStore((state) => state)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append('id', product.id?.toString() || '')

    const { success, data } = await deleteProductAction(formData)
    if (success) {
      deleteProduct(data[0].id)
      toast.success('Student Deleted')
      setOpen(false)
    } else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <ModalContainer setOpen={setOpen} isOpen={isOpen}>
      <form onSubmit={onSubmit} className="grid gap-4">
        <h1 className="text-lg font-semibold">Delete Product</h1>
        <div className="grid grid-cols-2 gap-2">
          <Image
            alt={product.name}
            width={200}
            height={200}
            src={
              product.image
                ? `${assetsBaseUrl}${product.image}`
                : '/images/product/p-1.png'
            }
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
    </ModalContainer>
  )
}

export default DeleteProductModal
