import Image from 'next/image'
import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { useStore } from '@/store/provider'
import Button from '@/components/common/Button'
import { assetsBaseUrl } from '@/libs/assetsManagement'
import AiOutlinePlus from '@/components/icons/AiOutlinePlus'
import AiOutlineMinus from '@/components/icons/AiOutlineMinus'
import type { Product } from '@/database/schema/productsSchema'
import ModalContainer from '@/components/common/ModalContainer'
import insertOrderAction from '@/actions/orders/insertOrderAction'

interface CreateCheckoutModalProp {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  product: Product
}

const CreateCheckoutModal = ({
  isOpen,
  setOpen,
  product,
}: CreateCheckoutModalProp) => {
  const { auth, setAuth, updateOrder } = useStore((state) => state)

  const [quantity, setQuantity] = useState(1)
  const [type, setType] = useState('takeaway')

  const handleQuantity = (operation: '+' | '-') => {
    if (!auth) return

    if (operation === '+') {
      const updatedQuantity = quantity + 1

      // if (updatedQuantity * parseFloat(product.price) > parseFloat(auth.credit))
      //   toast.warn('Low balance')
      // else
      setQuantity(updatedQuantity)
    } else if (operation === '-') setQuantity((s) => (s > 1 ? s - 1 : s))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // if (quantity * parseFloat(product.price) > parseFloat(auth.credit)) {
    //   toast.warn('Low balance')
    //   return
    // }

    if (!product.id) {
      toast.warn('Product not found')
      return
    }

    const { success, message, codeMessage, data } = await insertOrderAction({
      type,
      quantity,
      productId: product.id,
    })
    if (success) {
      updateOrder(data[0])
      toast.success('Order placed')
      setOpen(false)
      setAuth({
        ...auth,
        credit: (parseFloat(auth?.credit) - parseFloat(product.price)).toFixed(
          2
        ),
      })
    } else if (codeMessage === 'must_be_unimib_email') toast.error(message)
    else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <ModalContainer setOpen={setOpen} isOpen={isOpen}>
      <form onSubmit={onSubmit}>
        <h1 className="text-center text-xl font-semibold">Checkout</h1>

        <div className="space-y-2">
          <div className="grid grid-cols-[52px_auto] rounded-lg border border-neutral-300">
            <div className="rounded-lg bg-primary-light p-1">
              <Image
                width={50}
                height={50}
                alt={product.name}
                className="size-11"
                src={
                  product.image
                    ? `${assetsBaseUrl}${product.image}`
                    : '/images/product/p-1.png'
                }
              />
            </div>
            <div className="flex items-center justify-between p-2 text-sm">
              <div>
                <p>{product.name}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuantity('-')}
                    className="rounded-lg bg-primary-light p-1"
                  >
                    <AiOutlineMinus />
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantity('+')}
                    className="rounded-lg bg-primary-light p-1"
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-neutral-500">Price</p>
                <p>€{parseFloat(product.price).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between rounded-lg border border-neutral-300 p-2 text-sm font-semibold">
            <p>Order Type</p>
            <select
              onChange={({ target }) => setType(target.value)}
              defaultValue={type}
            >
              <option value="takeaway">Takeaway</option>
              <option value="dine in">Dine-In</option>
            </select>
          </div>

          <div className="flex justify-between rounded-lg border border-neutral-300 p-2 text-sm font-semibold">
            <p>Total</p>
            <p>€{(quantity * Number(product.price)).toFixed(2)}</p>
          </div>
        </div>

        <Button className="w-full rounded-lg">Checkout</Button>
      </form>
    </ModalContainer>
  )
}

export default CreateCheckoutModal
