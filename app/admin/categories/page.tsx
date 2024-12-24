'use client'

import {
  Row,
  Table,
  TableBody,
  TableHeader,
  Button as AriaButton,
} from 'react-aria-components'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/store/provider'
import FaPlus from '@/components/icons/FaPlus'
import Button from '@/components/common/Button'
import { classnames, CONSTANTS } from '@/utils'
import Loading from '@/components/common/Loading'
import TableCell from '@/components/common/TableCell'
import DataError from '@/components/common/DataError'
import { assetsBaseUrl } from '@/libs/assetsManagement'
import TableColumn from '@/components/common/TableColumn'
import AiOutlineEdit from '@/components/icons/AiOutlineEdit'
import AiOutlineDelete from '@/components/icons/AiOutlineDelete'
import { type Category } from '@/database/schema/categoriesSchema'
import EditCategoryModal from '@/components/modals/category/EditCategoryModal'
import getAllCategoriesAction from '@/actions/category/getAllCategoriesAction'
import DeleteCategoryModal from '@/components/modals/category/DeleteCategoryModal'
import CreateCategoryModal from '@/components/modals/category/CreateCategoryModal'

const dataErrorMessage = 'Unable to load categories'

const CategoriesPage = () => {
  const { categories, setCategories } = useStore((state) => state)

  const [editModalData, setEditModalData] = useState<Category | null>(null)
  const [deleteModalData, setDeleteModalData] = useState<Category | null>(null)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)

  const { isPending, error, refetch } = useQuery({
    queryKey: ['getAllCategories'],
    queryFn: async () => {
      const { data, success } = await getAllCategoriesAction()
      if (success) setCategories(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div>
      {editModalData && (
        <EditCategoryModal
          category={editModalData}
          isOpen={!!editModalData}
          setOpen={() => setEditModalData(null)}
        />
      )}
      {deleteModalData && (
        <DeleteCategoryModal
          category={deleteModalData}
          isOpen={!!deleteModalData}
          setOpen={() => setDeleteModalData(null)}
        />
      )}
      <CreateCategoryModal
        isOpen={isAddModalVisible}
        setOpen={setIsAddModalVisible}
      />

      <Table
        aria-label="Categories"
        selectionMode="multiple"
        className="w-full text-sm"
      >
        <TableHeader>
          <TableColumn isRowHeader className="text-left">
            Name
          </TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn className="text-right">
            <Button
              className="ml-auto flex items-center gap-1 rounded-lg"
              onPress={() => setIsAddModalVisible(true)}
            >
              <FaPlus /> Category
            </Button>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <Row key={category.id} id={category.id}>
              <TableCell className="border-b border-neutral-300 p-2">
                <div className="grid grid-cols-[40px_auto] items-center gap-2">
                  <Image
                    alt={category.name}
                    width={40}
                    height={40}
                    src={
                      category.image
                        ? `${assetsBaseUrl}${category.image}`
                        : CONSTANTS.imagePlaceholders.product
                    }
                    className={classnames(
                      'size-10 rounded-full border-2 bg-primary-light object-contain',
                      category.published
                        ? 'border-primary'
                        : 'border-neutral-400'
                    )}
                  />
                  {category.name}
                </div>
              </TableCell>

              <TableCell className="border-b border-neutral-300 p-2 text-center font-semibold">
                {category.published ? (
                  <p className="text-green-700">Active</p>
                ) : (
                  <p className="text-red-700">Inactive</p>
                )}
              </TableCell>
              <TableCell className="border-b border-neutral-300 p-2 text-right">
                <AriaButton
                  onPress={() => setEditModalData(category)}
                  className="mx-1 rounded-lg bg-yellow-200 p-2 text-lg text-yellow-600 shadow"
                >
                  <AiOutlineEdit />
                </AriaButton>
                <AriaButton
                  onPress={() => setDeleteModalData(category)}
                  className="mx-1 rounded-lg bg-red-200 p-2 text-lg text-red-600 shadow"
                >
                  <AiOutlineDelete />
                </AriaButton>
              </TableCell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CategoriesPage
