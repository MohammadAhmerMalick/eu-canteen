import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import HiBadgeCheck from '@/icons/HiBadgeCheck'
import AiOutlinePaperClip from '@/icons/AiOutlinePaperClip'
import insertCategoryAction from '@/actions/category/insertCategoryAction'
import ModalContainer from '@/components/common/ModalContainer'

interface CreateCategoryModalProp {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CreateCategoryModal = ({ isOpen, setOpen }: CreateCategoryModalProp) => {
  const queryClient = useQueryClient()
  const { insertCategory } = useStore((state) => state)

  const [name, setName] = useState('')
  const [image, setImage] = useState<File | ''>('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)

    const { success, message, codeMessage, data } =
      await insertCategoryAction(formData)

    if (success) {
      insertCategory(data[0])
      queryClient.invalidateQueries({ queryKey: ['getAllCategories'] })
      toast.success('Category created successfully')
      setOpen(false)
    } else if (codeMessage === 'category_already_exist') toast.warn(message)
    else if (codeMessage === 'fields_are_missing') toast.warn(message)
    else if (codeMessage === 'must_be_unimib_email') toast.error(message)
    else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <ModalContainer setOpen={setOpen} isOpen={isOpen}>
      <form onSubmit={onSubmit} className={classnames('grid gap-4')}>
        <h1 className="text-lg font-semibold">Create Category</h1>
        <div className="grid grid-cols-2 gap-4">
          <Input
            isRequired
            id="name"
            value={name}
            labelText="Category Name"
            onChange={({ value }) => setName(value)}
            labelClassName="text-sm"
            placeholder="BBQ"
          />

          <div>
            <p>Category Image</p>
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
        <Button className="ml-auto w-max !py-1">Create Category</Button>
      </form>
    </ModalContainer>
  )
}

export default CreateCategoryModal
