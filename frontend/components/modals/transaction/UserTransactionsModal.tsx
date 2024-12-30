'use client'

import {
  Row,
  Table,
  TableBody,
  TableHeader,
  type Selection,
} from 'react-aria-components'
import { Dispatch, SetStateAction, useState } from 'react'

import EuroChip from '@/components/common/EuroChip'
import TableCell from '@/components/common/TableCell'
import TableColumn from '@/components/common/TableColumn'
import ModalContainer from '@/components/common/ModalContainer'
import ProductCellWidget from '@/components/widgets/ProductCellWidget'
import { type TransactionSlice } from '@/store/slices/transactionsSlice'

interface UserTransactionssModalProp {
  isOpen: boolean
  transactions: TransactionSlice[]
  setOpen: Dispatch<SetStateAction<boolean>>
}

const UserTransactionssModal = ({
  isOpen,
  setOpen,
  transactions,
}: UserTransactionssModalProp) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  return (
    <div>
      <ModalContainer setOpen={setOpen} isOpen={isOpen} className="max-w-full">
        <Table
          aria-label="Transactions"
          onRowAction={() => {}}
          selectionMode="multiple"
          className="w-full text-sm"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader>
            <TableColumn isRowHeader className="text-left">
              Product
            </TableColumn>
            <TableColumn>Transaction Type</TableColumn>
            <TableColumn>Placed At</TableColumn>
            <TableColumn>Price</TableColumn>
          </TableHeader>
          <TableBody>
            {transactions.map(({ transaction, product }) => (
              <Row key={transaction.id} id={transaction.id}>
                <TableCell>
                  {product && <ProductCellWidget product={product} />}
                </TableCell>
                <TableCell className="text-center capitalize">
                  {transaction.type.replaceAll(' ', '-')}
                </TableCell>

                <TableCell className="text-center">
                  {new Date(transaction.createdAt || '').toLocaleTimeString()}{' '}
                  {new Date(transaction.createdAt || '').toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  <EuroChip amount={transaction.amount} />
                </TableCell>
              </Row>
            ))}
          </TableBody>
        </Table>
      </ModalContainer>
    </div>
  )
}

export default UserTransactionssModal
