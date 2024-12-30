'use client'

import {
  Row,
  Table,
  MenuItem,
  TableBody,
  TableHeader,
  type Selection,
} from 'react-aria-components'
import { useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'

import MenuPopup from '@/components/common/Menu'
import EuroChip from '@/components/common/EuroChip'
import Checkbox from '@/components/common/Checkbox'
import { Select1 } from '@/components/common/Select1'
import TableCell from '@/components/common/TableCell'
import TableColumn from '@/components/common/TableColumn'
import { type OrderSlice } from '@/store/slices/ordersSlice'
import ModalContainer from '@/components/common/ModalContainer'
import UserCellWidget from '@/components/widgets/UserCellWidget'
import ProductCellWidget from '@/components/widgets/ProductCellWidget'
import updateOrdersStatusAction from '@/actions/orders/updateOrdersStatusAction'

const orderStatusOptions = [
  { id: 'pending', name: 'Pending' },
  { id: 'ready', name: 'Ready' },
  { id: 'canceled', name: 'Canceled' },
  { id: 'completed', name: 'Completed' },
]

interface UserOrdersModalProp {
  isOpen: boolean
  orders: OrderSlice[]
  setOpen: Dispatch<SetStateAction<boolean>>
}

const UserOrdersModal = ({ isOpen, setOpen, orders }: UserOrdersModalProp) => {
  const queryClient = useQueryClient()

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  const onOrderStatusChange = (order: OrderSlice['order'], status: string) => {
    updateOrdersStatusAction({ ids: [order.id || ''], status })
    queryClient.invalidateQueries({ queryKey: ['getOrders'] })
    setOpen(false)
  }

  const bulkAction = async (status: string) => {
    const updatedOrders = orders.filter(
      ({ order }) =>
        [...selectedKeys].includes(order.id || '') || selectedKeys === 'all'
    )

    const updatedOrdersIds = updatedOrders
      .map((o) => o.order.id || '')
      .filter((x) => x)

    await updateOrdersStatusAction({
      ids: updatedOrdersIds,
      status,
    })

    queryClient.invalidateQueries({ queryKey: ['getOrders'] })

    setOpen(false)
    setSelectedKeys(new Set())
  }

  return (
    <div>
      <ModalContainer setOpen={setOpen} isOpen={isOpen} className="max-w-full">
        <Table
          aria-label="Orders"
          onRowAction={() => {}}
          selectionMode="multiple"
          className="w-full text-sm"
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
                Student
              </div>
            </TableColumn>
            <TableColumn className="text-left">Product</TableColumn>
            <TableColumn>Order Type</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Placed At</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            {orders.map(({ order, product, user }) => (
              <Row key={order.id} id={order.id}>
                <TableCell className="w-9 text-center">
                  <Checkbox slot="selection" />
                </TableCell>
                <TableCell>{user && <UserCellWidget user={user} />}</TableCell>
                <TableCell>
                  {product && <ProductCellWidget product={product} />}
                </TableCell>
                <TableCell className="text-center capitalize">
                  {order.type.replaceAll(' ', '-')}
                </TableCell>
                <TableCell className="text-center">{order.quantity}</TableCell>
                <TableCell className="text-center">
                  {new Date(order.createdAt || '').toLocaleTimeString()}{' '}
                  {new Date(order.createdAt || '').toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  <EuroChip
                    amount={parseFloat(order.unitPrice) * order.quantity}
                  />
                </TableCell>
                <TableCell>
                  <Select1
                    items={orderStatusOptions}
                    placeholder="Order Status"
                    selectedKey={order.status}
                    onSelectionChange={(value) =>
                      onOrderStatusChange(order, value as string)
                    }
                  />
                </TableCell>
              </Row>
            ))}
          </TableBody>
        </Table>
      </ModalContainer>
    </div>
  )
}

export default UserOrdersModal
