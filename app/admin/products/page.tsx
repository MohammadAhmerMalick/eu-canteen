'use client'

import Image from 'next/image'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'

import {
  Row,
  Table,
  MenuItem,
  TableBody,
  TableHeader,
  Button as AriaButton,
  type Selection,
} from 'react-aria-components'
import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import FaPlus from '@/components/icons/FaPlus'
import Button from '@/components/common/Button'
import MenuPopup from '@/components/common/Menu'
import Loading from '@/components/common/Loading'
import EuroChip from '@/components/common/EuroChip'
import Checkbox from '@/components/common/Checkbox'
import TableCell from '@/components/common/TableCell'
import DataError from '@/components/common/DataError'
import { assetsBaseUrl } from '@/libs/assetsManagement'
import TableColumn from '@/components/common/TableColumn'
import productsTable from '@/database/schema/productsSchema'
import AiOutlineEdit from '@/components/icons/AiOutlineEdit'
import AiOutlineDelete from '@/components/icons/AiOutlineDelete'
import getAllProductsAction from '@/actions/product/getAllProductsAction'
import EditProductModal from '@/components/modals/product/EditProductModal'
import getAllCategoriesAction from '@/actions/category/getAllCategoriesAction'
import DeleteProductModal from '@/components/modals/product/DeleteProductModal'
import CreateProductModal from '@/components/modals/product/CreateProductModal'
import updateProductsPublishedStateAction from '@/actions/product/updateProductsPublishedStateAction'

const dataErrorMessage = 'Unable to load products'

const orderStatusOptions = [
  {
    id: 'active',
    name: 'Active',
  },
  {
    id: 'inactive',
    name: 'Inactive',
  },
]

const ProductsPage = () => {
  const { products, setProducts, updateProduct } = useStore((state) => state)
  const { categories, setCategories } = useStore((state) => state)
  const [editModalData, setEditModalData] = useState<
    typeof productsTable.$inferInsert | null
  >(null)
  const [deleteModalData, setDeleteModalData] = useState<
    typeof productsTable.$inferInsert | null
  >(null)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

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

  const bulkAction = (activeState: string) => {
    const published = activeState === 'active'
    const updatedProducts = products.filter(
      ({ id }) => [...selectedKeys].includes(id || '') || selectedKeys === 'all'
    )
    const updatedProductIds = updatedProducts.map((p) => {
      updateProduct({ ...p, published })
      return p.id || ''
    })
    updateProductsPublishedStateAction({
      ids: updatedProductIds,
      published,
    })
    setSelectedKeys(new Set())
  }

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

      <Table
        aria-label="Orders"
        selectionMode="multiple"
        className="w-full"
        onRowAction={(e) => console.log(e)}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <TableColumn>
            <Checkbox slot="selection" />
          </TableColumn>
          <TableColumn isRowHeader>
            <div className="flex items-center gap-4">
              {[...selectedKeys].length ? (
                <MenuPopup>
                  {orderStatusOptions.map(({ id, name }) => (
                    <MenuItem key={id} onAction={() => bulkAction(id)}>
                      {name}
                    </MenuItem>
                  ))}
                </MenuPopup>
              ) : (
                ''
              )}
              Name
            </div>
          </TableColumn>
          <TableColumn className="text-left">Description</TableColumn>
          <TableColumn className="text-left">Price</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>
            <Button
              className="ml-auto flex items-center gap-1 rounded-lg"
              onPress={() => setIsAddModalVisible(true)}
            >
              <FaPlus /> Product
            </Button>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <Row key={product.id} id={product.id}>
              <TableCell className="text-center">
                <Checkbox slot="selection" />
              </TableCell>
              <TableCell>
                <div className="grid grid-cols-[40px_auto] items-center gap-2">
                  <Image
                    alt={product.name}
                    width={40}
                    height={40}
                    src={
                      product.image
                        ? `${assetsBaseUrl}${product.image}`
                        : '/images/products/p-1.png'
                    }
                    className={classnames(
                      'rounded-full border-2',
                      product.published
                        ? 'border-primary'
                        : 'border-neutral-400'
                    )}
                  />
                  {product.name}
                </div>
              </TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell className="text-center">
                <EuroChip amount={product.price} />
              </TableCell>
              <TableCell className="text-center">
                {product.published ? (
                  <p className="text-green-700">Active</p>
                ) : (
                  <p className="text-red-700">Inactive</p>
                )}
              </TableCell>
              <TableCell className="text-right">
                <AriaButton
                  onPress={() => setEditModalData(product)}
                  className="mx-1 rounded-lg bg-yellow-200 p-2 text-lg text-yellow-600 shadow"
                >
                  <AiOutlineEdit />
                </AriaButton>
                <AriaButton
                  onPress={() => setDeleteModalData(product)}
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

export default ProductsPage
