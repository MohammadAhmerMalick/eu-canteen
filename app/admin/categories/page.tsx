'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import FaPlus from '@/components/icons/FaPlus'
import Button from '@/components/common/Button'
import AiOutlineEdit from '@/components/icons/AiOutlineEdit'
import AiOutlineDelete from '@/components/icons/AiOutlineDelete'
import categoriesTable from '@/database/schema/categoriesSchema'
import EditCategoryModal from '@/components/modals/category/EditCategoryModal'
import getAllCategoriesAction from '@/actions/category/getAllCategoriesAction'
import DeleteCategoryModal from '@/components/modals/category/DeleteCategoryModal'
import CreateCategoryModal from '@/components/modals/category/CreateCategoryModal'

const CategoriesPage = () => {
  const { categories, setCategories } = useStore((state) => state)

  const [editModalData, setEditModalData] = useState<
    typeof categoriesTable.$inferInsert | null
  >(null)
  const [deleteModalData, setDeleteModalData] = useState<
    typeof categoriesTable.$inferInsert | null
  >(null)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)

  const getCategories = useCallback(async () => {
    const { data } = await getAllCategoriesAction()
    setCategories(data)
  }, [setCategories])

  useEffect(() => {
    if (!categories.length) getCategories()
  }, [getCategories, categories.length])

  return (
    <div>
      {editModalData && (
        <EditCategoryModal
          category={editModalData}
          onClose={() => setEditModalData(null)}
        />
      )}
      {deleteModalData && (
        <DeleteCategoryModal
          category={deleteModalData}
          onClose={() => setDeleteModalData(null)}
        />
      )}
      {isAddModalVisible && (
        <CreateCategoryModal onClose={() => setIsAddModalVisible(false)} />
      )}

      <table className="w-full text-sm">
        <thead>
          <tr>
            <td className="border-b border-neutral-300 p-2">Name</td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Status
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              <Button
                className="mx-auto flex items-center gap-1 rounded-lg"
                onClick={() => setIsAddModalVisible(true)}
              >
                <FaPlus /> Add Category
              </Button>
            </td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border-b border-neutral-300 p-2">
                <div className="grid grid-cols-[40px_auto] items-center gap-2">
                  <Image
                    alt={category.name}
                    width={40}
                    height={40}
                    src={`/images/categories/${category.image}`}
                    className={classnames(
                      'rounded-full border-2',
                      category.published
                        ? 'border-primary'
                        : 'border-neutral-400'
                    )}
                  />
                  {category.name}
                </div>
              </td>

              <td className="border-b border-neutral-300 p-2 text-center font-semibold">
                {category.published ? (
                  <p className="text-green-700">Active</p>
                ) : (
                  <p className="text-red-700">Inactive</p>
                )}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                <button
                  onClick={() => setEditModalData(category)}
                  className="mx-1 rounded-lg bg-yellow-200 p-2 text-lg text-yellow-600 shadow"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => setDeleteModalData(category)}
                  className="mx-1 rounded-lg bg-red-200 p-2 text-lg text-red-600 shadow"
                >
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoriesPage
