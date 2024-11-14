import { toast } from 'react-toastify'
import { FormEvent, useState, type MouseEvent } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import HiBadgeCheck from '@/icons/HiBadgeCheck'
import AiOutlinePaperClip from '@/icons/AiOutlinePaperClip'
import insertProductAction from '@/actions/product/insertProductAction'
import Textarea from '@/components/common/Textarea'

interface CreateProductModalProp {
  onClose(): any
}

const CreateProductModal = ({ onClose }: CreateProductModalProp) => {
  const { insertProduct } = useStore((state) => state)

  const onContainerClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => e.currentTarget === e.target && onClose()

  const [name, setName] = useState('')
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | ''>('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)
    formData.append('description', description)

    const { success, message, codeMessage, data } =
      await insertProductAction(formData)

    if (success) {
      insertProduct(data[0])
      toast.success('Product created successfully')
      onClose()
    } else if (codeMessage === 'product_already_exist')
      toast.warn(
        'Your request is aready in pending state, contact admin for further information'
      )
    else if (codeMessage === 'fields_are_missing') toast.warn(message)
    else if (codeMessage === 'must_be_unimib_email') toast.error(message)
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
          'grid max-h-full w-full max-w-3xl gap-4 overflow-hidden rounded-lg bg-white p-3 shadow-lg md:mt-0 md:p-6'
        )}
      >
        <h1 className="text-lg font-semibold">Create Product</h1>
        <div className="grid grid-cols-2 gap-4">
          <Input
            isRequired
            id="name"
            value={name}
            labelText="Product Name"
            onChange={({ value }) => setName(value)}
            labelClassName="text-sm"
            placeholder="BBQ"
          />
          <Input
            isRequired
            id="stock"
            onlyNumber
            value={stock}
            labelText="stock"
            onChange={({ value }) => setStock(value)}
            labelClassName="text-sm"
            placeholder="10"
          />
          <Input
            isRequired
            id="price"
            onlyNumber
            value={price}
            labelText="price"
            onChange={({ value }) => setPrice(value)}
            labelClassName="text-sm"
            placeholder="10"
          />

          <div>
            <p>Product Image</p>
            <label
              htmlFor="image"
              className="relative mt-1 flex w-max cursor-pointer items-center gap-1 text-xs text-neutral-500"
            >
              <input
                required
                type="file"
                id="image"
                accept="image/*"
                className="absolute left-10 w-1 opacity-0"
                onChange={({ target }) => setImage(target.files?.[0] || '')}
              />
              <span className="text-primary">
                <AiOutlinePaperClip />
              </span>
              Upload Front
              {image ? (
                <span className="text-green-600">
                  <HiBadgeCheck />
                </span>
              ) : (
                ''
              )}
            </label>
          </div>
        </div>
        <Textarea
          isRequired
          id="description"
          value={description}
          labelText="Description"
          onChange={({ value }) => setDescription(value)}
          labelClassName="text-sm"
          placeholder="A patty of ground beef grilled and placed between two halves of a bun"
        />
        <Button className="ml-auto w-max !py-1">Create Product</Button>
      </form>
    </div>
  )
}

export default CreateProductModal
