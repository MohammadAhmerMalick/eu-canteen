import Image from 'next/image'
import { toast } from 'react-toastify'
import { FormEvent, type MouseEvent } from 'react'

import { classnames } from '@/utils'
import Button from '@/components/common/Button'
import categoriesTable from '@/database/schema/categoriesSchema'
import deleteCategoryAction from '@/actions/category/deleteCategoryAction'

interface DeleteCategoryModalProp {
  onClose(): any
  category: typeof categoriesTable.$inferInsert
}

const DeleteCategoryModal = ({
  onClose,
  category,
}: DeleteCategoryModalProp) => {
  const onContainerClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => e.currentTarget === e.target && onClose()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append('id', category.id?.toString() || '')

    const { success } = await deleteCategoryAction(formData)
    if (success) {
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
        <h1 className="text-lg font-semibold">Delete Category</h1>
        <div className="grid grid-cols-2 gap-2">
          <Image
            alt={category.name}
            width={200}
            height={200}
            src={`/images/categories/${category.image}`}
            className={classnames(
              'rounded-full border-2',
              category.published ? 'border-primary' : 'border-neutral-400'
            )}
          />
          <div className="grid h-min gap-2">
            <p>
              {' '}
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
    </div>
  )
}

export default DeleteCategoryModal
