'use client'

import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'

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
import AiOutlineEdit from '@/components/icons/AiOutlineEdit'
import type { Product } from '@/database/schema/productsSchema'
import AiOutlineDelete from '@/components/icons/AiOutlineDelete'
import getAllProductsAction from '@/actions/product/getAllProductsAction'
import EditProductModal from '@/components/modals/product/EditProductModal'
import DeleteProductModal from '@/components/modals/product/DeleteProductModal'
import CreateProductModal from '@/components/modals/product/CreateProductModal'
import updateProductsPublishedAction from '@/actions/product/updateProductsPublishedAction'

const dataErrorMessage = 'Unable to load products'

const orderPublishedOptions = [
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
  const { products, setProducts, updateProductsPublished } = useStore(
    (state) => state
  )

  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [editModalData, setEditModalData] = useState<Product | null>(null)
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [deleteModalData, setDeleteModalData] = useState<Product | null>(null)

  const { isPending, error } = useQuery({
    queryKey: ['getAllProducts'],
    queryFn: async () => {
      const { data, success } = await getAllProductsAction()
      if (success) setProducts(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  const bulkAction = (publishedKey: string) => {
    const published = publishedKey === 'active'
    const updatedProducts = products.filter(
      ({ products: product }) =>
        [...selectedKeys].includes(product.id || '') || selectedKeys === 'all'
    )

    updatedProducts.map(({ products: product }) =>
      updateProductsPublished({ ...product, id: product.id || '', published })
    )

    const updatedProductsIds = updatedProducts
      .map((o) => o.products.id || '')
      .filter((x) => x)

    updateProductsPublishedAction({
      ids: updatedProductsIds,
      published,
    })

    setSelectedKeys(new Set())
  }

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div>
      {editModalData && (
        <EditProductModal
          product={editModalData}
          isOpen={!!editModalData}
          setOpen={() => setEditModalData(null)}
        />
      )}
      {deleteModalData && (
        <DeleteProductModal
          product={deleteModalData}
          isOpen={!!deleteModalData}
          setOpen={() => setDeleteModalData(null)}
        />
      )}

      <CreateProductModal
        isOpen={isAddModalVisible}
        setOpen={setIsAddModalVisible}
      />

      <Table
        aria-label="Orders"
        selectionMode="multiple"
        className="w-full text-sm"
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
                  {orderPublishedOptions.map(({ id, name }) => (
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
          <TableColumn className="text-left">Category</TableColumn>
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
          {products.map(({ products: product, categories: category }) => (
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
              <TableCell>
                {category ? (
                  <div
                    key={category.id}
                    className="grid grid-cols-[40px_auto] items-center gap-2"
                  >
                    <Image
                      alt={category.name}
                      width={40}
                      height={40}
                      src={
                        category.image
                          ? `${assetsBaseUrl}${category.image}`
                          : '/images/products/p-1.png'
                      }
                      className={classnames(
                        'rounded-full border-2',
                        category.published
                          ? 'border-primary'
                          : 'border-neutral-400'
                      )}
                    />
                    {category.name}
                  </div>
                ) : (
                  <div />
                )}
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
