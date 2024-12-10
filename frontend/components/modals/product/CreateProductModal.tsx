import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Input from '@/components/common/Input'
import Select from '@/components/common/select'
import Button from '@/components/common/Button'
import HiBadgeCheck from '@/icons/HiBadgeCheck'
import Textarea from '@/components/common/Textarea'
import AiOutlinePaperClip from '@/icons/AiOutlinePaperClip'
import insertProductAction from '@/actions/product/insertProductAction'
import ModalContainer from '@/components/common/ModalContainer'

interface CreateProductModalProp {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CreateProductModal = ({ isOpen, setOpen }: CreateProductModalProp) => {
  const { categories } = useStore((state) => state)
  const { insertProduct } = useStore((state) => state)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategory] = useState('')
  const [image, setImage] = useState<File | ''>('')
  const [description, setDescription] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)
    formData.append('price', price)
    formData.append('categoryId', categoryId)
    formData.append('description', description)

    const { success, data } = await insertProductAction(formData)

    if (success) {
      insertProduct(data)
      toast.success('Product created successfully')
      setOpen(false)
    } else toast.error('Unable to handle request right now')
  }

  return (
    <ModalContainer setOpen={setOpen} isOpen={isOpen}>
      <form onSubmit={onSubmit} className={classnames('grid gap-4')}>
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
            id="price"
            onlyNumber
            value={price}
            labelText="Price"
            onChange={({ value }) => setPrice(value)}
            labelClassName="text-sm"
            placeholder="10"
          />
          <Select
            id="categoryId"
            value={categoryId}
            labelText="Category"
            labelClassName="text-sm"
            onChange={({ value }) => setCategory(value)}
            options={categories.map(({ id, name }) => ({
              text: name,
              key: id || '',
              value: id || '',
            }))}
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
    </ModalContainer>
  )
}

export default CreateProductModal
