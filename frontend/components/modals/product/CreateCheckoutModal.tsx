import Image from 'next/image'
import { toast } from 'react-toastify'
import { FormEvent, useState, type MouseEvent } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Button from '@/components/common/Button'
import productsTable from '@/database/schema/productsSchema'
import AiOutlinePlus from '@/components/icons/AiOutlinePlus'
import AiOutlineMinus from '@/components/icons/AiOutlineMinus'
import insertOrderAction from '@/actions/orders/insertOrderAction'

interface CreateCheckoutModalProp {
  onClose(): any
  product: typeof productsTable.$inferInsert
}

const CreateCheckoutModal = ({ onClose, product }: CreateCheckoutModalProp) => {
  const { auth, updateOrder } = useStore((state) => state)

  const [quantity, setQuantity] = useState(1)
  const [type, setType] = useState('takeaway')

  const handleQuantity = (operation: '+' | '-') => {
    if (!auth) return

    if (operation === '+')
      setQuantity((s) => {
        return s + 1
      })
    else if (operation === '-') setQuantity((s) => (s > 1 ? s - 1 : s))
  }

  const onContainerClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => e.currentTarget === e.target && onClose()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!product.id) return

    const { success, message, codeMessage, data } = await insertOrderAction({
      type,
      quantity,
      productId: product.id,
    })
    if (success) {
      updateOrder(data[0])
      toast.success('Product updated')
      onClose()
    } else if (codeMessage === 'must_be_unimib_email') toast.error(message)
    else
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
          'max-h-full w-full max-w-3xl space-y-4 overflow-hidden rounded-3xl bg-white p-6 shadow-lg md:mt-0 md:p-6'
        )}
      >
        <h1 className="text-center text-xl font-semibold">Checkout</h1>

        <div className="space-y-2">
          <div className="grid grid-cols-[52px_auto] rounded-lg border border-neutral-300">
            <div className="rounded-lg bg-primary-light p-1">
              <Image
                width={50}
                height={50}
                alt={product.name}
                className="size-11"
                src={`/images/products/${product.image}`}
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
                <p>€{Number(product.price).toFixed(2)}</p>
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
              <option value="dining">Dining</option>
            </select>
          </div>

          <div className="flex justify-between rounded-lg border border-neutral-300 p-2 text-sm font-semibold">
            <p>Total</p>
            <p>€{(quantity * Number(product.price)).toFixed(2)}</p>
          </div>
        </div>

        <Button className="w-full rounded-lg">Checkout</Button>
      </form>
    </div>
  )
}

export default CreateCheckoutModal
