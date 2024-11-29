'use client'

import Image from 'next/image'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import FaPlus from '@/components/icons/FaPlus'
import Button from '@/components/common/Button'
import Loading from '@/components/common/Loading'
import EuroChip from '@/components/common/EuroChip'
import DataError from '@/components/common/DataError'
import productsTable from '@/database/schema/productsSchema'
import AiOutlineEdit from '@/components/icons/AiOutlineEdit'
import AiOutlineDelete from '@/components/icons/AiOutlineDelete'
import getAllProductsAction from '@/actions/product/getAllProductsAction'
import EditProductModal from '@/components/modals/product/EditProductModal'
import getAllCategoriesAction from '@/actions/category/getAllCategoriesAction'
import DeleteProductModal from '@/components/modals/product/DeleteProductModal'
import CreateProductModal from '@/components/modals/product/CreateProductModal'

const dataErrorMessage = 'Unable to load products'

const ProductsPage = () => {
  const { products, setProducts } = useStore((state) => state)
  const { categories, setCategories } = useStore((state) => state)
  const [editModalData, setEditModalData] = useState<
    typeof productsTable.$inferInsert | null
  >(null)
  const [deleteModalData, setDeleteModalData] = useState<
    typeof productsTable.$inferInsert | null
  >(null)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)

  const { isPending, error } = useQuery({
    queryKey: ['getProducts'],
    queryFn: async () => {
      const { data, success } = await getAllProductsAction()
      if (success) setProducts(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  const getCategories = useCallback(async () => {
    const { data } = await getAllCategoriesAction()
    setCategories(data)
  }, [setCategories])

  useEffect(() => {
    if (!categories.length) getCategories()
  }, [getCategories, categories.length])

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div>
      {editModalData && (
        <EditProductModal
          product={editModalData}
          onClose={() => setEditModalData(null)}
        />
      )}
      {deleteModalData && (
        <DeleteProductModal
          product={deleteModalData}
          onClose={() => setDeleteModalData(null)}
        />
      )}
      {isAddModalVisible && (
        <CreateProductModal onClose={() => setIsAddModalVisible(false)} />
      )}

      <table className="w-full text-sm">
        <thead>
          <tr>
            <td className="border-b border-neutral-300 p-2">Name</td>
            <td className="border-b border-neutral-300 p-2">Description</td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Price
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Status
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              <Button
                className="mx-auto flex items-center gap-1 rounded-lg"
                onPress={() => setIsAddModalVisible(true)}
              >
                <FaPlus /> Add Product
              </Button>
            </td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border-b border-neutral-300 p-2">
                <div className="grid grid-cols-[40px_auto] items-center gap-2">
                  <Image
                    alt={product.name}
                    width={40}
                    height={40}
                    src="/images/products/p-1.png"
                    className={classnames(
                      'rounded-full border-2',
                      product.published
                        ? 'border-primary'
                        : 'border-neutral-400'
                    )}
                  />
                  {product.name}
                </div>
              </td>
              <td className="border-b border-neutral-300 p-2">
                {product.description}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                <EuroChip amount={product.price} />
              </td>
              <td className="border-b border-neutral-300 p-2 text-center font-semibold">
                {product.published ? (
                  <p className="text-green-700">Active</p>
                ) : (
                  <p className="text-red-700">Inactive</p>
                )}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                <button
                  onClick={() => setEditModalData(product)}
                  className="mx-1 rounded-lg bg-yellow-200 p-2 text-lg text-yellow-600 shadow"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => setDeleteModalData(product)}
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

export default ProductsPage
