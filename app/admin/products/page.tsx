'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { classnames } from '@/utils'
import FaPlus from '@/components/icons/FaPlus'
import Button from '@/components/common/Button'
import AiOutlineEdit from '@/components/icons/AiOutlineEdit'
import AiOutlineDelete from '@/components/icons/AiOutlineDelete'
import productsTable from '@/database/schema/productsSchema'
import EditProductModal from '@/components/modals/product/EditProductModal'
import getAllProductsActions from '@/actions/product/getAllProductsActions'
import DeleteProductModal from '@/components/modals/product/DeleteProductModal'
import CreateProductModal from '@/components/modals/product/CreateProductModal'

const ProductsPage = () => {
  const [products, setProducts] = useState<
    (typeof productsTable.$inferInsert)[]
  >([])

  const [editModalData, setEditModalData] = useState<
    typeof productsTable.$inferInsert | null
  >(null)
  const [deleteModalData, setDeleteModalData] = useState<
    typeof productsTable.$inferInsert | null
  >(null)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)

  const getProducts = useCallback(async () => {
    const { data } = await getAllProductsActions()
    setProducts(data)
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])

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
              Stock
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Price
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Status
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              <Button
                className="mx-auto flex items-center gap-1 rounded-lg"
                onClick={() => setIsAddModalVisible(true)}
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
                {product.stock}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                {product.price}
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
