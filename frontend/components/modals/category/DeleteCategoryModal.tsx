import Image from 'next/image'
import { FormEvent } from 'react'
import { toast } from 'react-toastify'
import type { Dispatch, SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { classnames } from '@/utils'
import Button from '@/components/common/Button'
import { assetsBaseUrl } from '@/libs/assetsManagement'
import ModalContainer from '@/components/common/ModalContainer'
import { type Category } from '@/database/schema/categoriesSchema'
import deleteCategoryAction from '@/actions/category/deleteCategoryAction'

interface DeleteCategoryModalProp {
  isOpen: boolean
  category: Category
  setOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteCategoryModal = ({
  isOpen,
  setOpen,
  category,
}: DeleteCategoryModalProp) => {
  const queryClient = useQueryClient()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append('id', category.id?.toString() || '')

    const { success } = await deleteCategoryAction(formData)
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['getAllCategories'] })
      toast.success('Category Deleted')
      setOpen(false)
    } else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <ModalContainer setOpen={setOpen} isOpen={isOpen}>
      <form onSubmit={onSubmit} className={classnames('grid gap-4')}>
        <h1 className="text-lg font-semibold">Delete Category</h1>
        <div className="grid grid-cols-2 gap-2">
          <Image
            width={200}
            height={200}
            alt={category.name}
            src={`${assetsBaseUrl}${category.image}`}
            className={classnames(
              'rounded-full border-2',
              category.published ? 'border-primary' : 'border-neutral-400'
            )}
          />
          <div className="grid h-min gap-2">
            <p>
              <span className="text-primary">Name:</span> {category.name}
            </p>
            <p>
              <span className="text-primary">Status:</span>{' '}
              {category.published ? (
                <span className="text-green-700">Active</span>
              ) : (
                <span className="text-red-700">Inactive</span>
              )}
            </p>
          </div>
        </div>
        <Button className="ml-auto w-max !py-1">Delete Category</Button>
      </form>
    </ModalContainer>
  )
}

export default DeleteCategoryModal
