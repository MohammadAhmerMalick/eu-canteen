import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { classnames } from '@/utils'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import HiBadgeCheck from '@/icons/HiBadgeCheck'
import AiOutlinePaperClip from '@/icons/AiOutlinePaperClip'
import ModalContainer from '@/components/common/ModalContainer'
import { type Category } from '@/database/schema/categoriesSchema'
import updateCategoryAction from '@/actions/category/updateCategoryAction'

interface EditCategoryModalProp {
  isOpen: boolean
  category: Category
  setOpen: Dispatch<SetStateAction<boolean>>
}

const EditCategoryModal = ({
  isOpen,
  setOpen,
  category,
}: EditCategoryModalProp) => {
  const queryClient = useQueryClient()

  const [name, setName] = useState(category.name)
  const [published, setPublished] = useState(!!category.published)
  const [image, setImage] = useState<File | ''>('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('id', category.id || '')
    formData.append('name', name)
    formData.append('image', image)
    formData.append('published', published ? 'published' : '')

    const { success, message, codeMessage } =
      await updateCategoryAction(formData)
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['getAllCategories'] })
      toast.success('Category updated')
      setOpen(false)
    } else if (codeMessage === 'must_be_unimib_email') toast.error(message)
    else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <ModalContainer setOpen={setOpen} isOpen={isOpen}>
      <form onSubmit={onSubmit} className={classnames('grid gap-4')}>
        <h1 className="text-lg font-semibold">Update Category</h1>
        <div className="grid grid-cols-2 gap-4">
          <Input
            isRequired
            id="name"
            value={name}
            labelText="Full Name"
            onChange={({ value }) => setName(value)}
            labelClassName="text-sm"
            placeholder="Burger"
          />

          <div>
            <p>Image</p>
            <label
              htmlFor="profileImage"
              className="relative mt-1 flex w-max cursor-pointer items-center gap-1 text-xs text-neutral-500"
            >
              <input
                type="file"
                id="profileImage"
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

          <div>
            <p>Status:</p>

            <div className="mt-1 text-xs text-neutral-500">
              <p className="mb-2">Disable items will not show to the users.</p>
              <label htmlFor="approve" className="me-3 inline-flex gap-2">
                <input
                  required
                  type="radio"
                  name="published"
                  id="approve"
                  checked={published}
                  onChange={() => setPublished(true)}
                />
                Enable
              </label>
              <label htmlFor="pending" className="me-3 inline-flex gap-2">
                <input
                  required
                  type="radio"
                  name="published"
                  id="pending"
                  checked={!published}
                  onChange={() => setPublished(false)}
                />
                Disable
              </label>
            </div>
          </div>
        </div>
        <Button className="ml-auto w-max !py-1">Update Category</Button>
      </form>
    </ModalContainer>
  )
}

export default EditCategoryModal
