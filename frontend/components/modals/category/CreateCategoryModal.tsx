import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState, type MouseEvent } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import HiBadgeCheck from '@/icons/HiBadgeCheck'
import AiOutlinePaperClip from '@/icons/AiOutlinePaperClip'
import insertCategoryAction from '@/actions/category/insertCategoryAction'

interface CreateCategoryModalProp {
  onClose(): any
}

const CreateCategoryModal = ({ onClose }: CreateCategoryModalProp) => {
  const queryClient = useQueryClient()
  const { insertCategory } = useStore((state) => state)

  const onContainerClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => e.currentTarget === e.target && onClose()

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
      onClose()
    } else if (codeMessage === 'category_already_exist') toast.warn(message)
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
    </div>
  )
}

export default CreateCategoryModal
