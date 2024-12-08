'use client'

import {
  Row,
  Table,
  TableBody,
  TableHeader,
  type Selection,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  type Key,
} from 'react-aria-components'
import { toast } from 'react-toastify'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useStore } from '@/store/provider'
import MenuPopup from '@/components/common/Menu'
import Loading from '@/components/common/Loading'
import EuroChip from '@/components/common/EuroChip'
import MenuItem from '@/components/common/MenuItem'
import Checkbox from '@/components/common/Checkbox'
import DataError from '@/components/common/DataError'
import TableCell from '@/components/common/TableCell'
import { Select1 } from '@/components/common/Select1'
import TableColumn from '@/components/common/TableColumn'
import { type OrderSlice } from '@/store/slices/ordersSlice'
import getOrdersAction from '@/actions/orders/getOrderssAction'
import StudentCellWidget from '@/components/widgets/StudentCellWidget'
import ProductCellWidget from '@/components/widgets/ProductCellWidget'
import updateOrdersStatusAction from '@/actions/orders/updateOrdersStatusAction'
import orders from '@/database/data/ordersSampleData'
import { classnames } from '@/utils'
import Image from 'next/image'

const dataErrorMessage = 'Unable to load orders'

const orderStatusOptions = [
  {
    id: 'pending',
    name: 'Pending',
  },
  {
    id: 'ready',
    name: 'Ready',
  },
  {
    id: 'canceled',
    name: 'Canceled',
  },
  {
    id: 'completed',
    name: 'Completed',
  },
]

const OrdersPage = () => {
  const {
    //  orders,
    setOrders,
    updateOrdersStatus,
  } = useStore((state) => state)

  console.log({ orders })
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [tabId, setTabId] = useState<Key>('')

  // const { isPending, error } = useQuery({
  //   queryKey: ['getOrders'],
  //   queryFn: async () => {
  //     const { data, success } = await getOrdersAction()
  //     if (success) setOrders(data)
  //     else toast.error(dataErrorMessage)
  //     return data
  //   },
  // })

  const onOrderStatusChange = (order: OrderSlice['order'], status: string) => {
    updateOrdersStatus({ ...order, id: order.id || '', status })
    updateOrdersStatusAction({ ids: [order.id || ''], status })
  }

  const bulkAction = (status: string) => {
    // const updatedOrders = orders.filter(
    //   ({ order }) =>
    //     [...selectedKeys].includes(order.id || '') || selectedKeys === 'all'
    // )
    // updatedOrders.map(({ order }) =>
    //   updateOrdersStatus({ ...order, id: order.id || '', status })
    // )
    // const updatedOrdersIds = updatedOrders
    //   .map((o) => o.order.id || '')
    //   .filter((x) => x)
    // updateOrdersStatusAction({
    //   ids: updatedOrdersIds,
    //   status,
    // })
    // setSelectedKeys(new Set())
  }

  const groupByDate = useMemo(
    () =>
      orders.reduce(
        (
          group: {
            [key: string]: {
              [userId: string]: OrderSlice[]
            }
          },
          orderSlice
        ) => {
          const { userId, createdAt } = orderSlice.order
          if (userId) {
            const date = new Date(createdAt)
            const key = date.toLocaleDateString()

            if (!group[key]) group[key] = {}
            if (!group[key][userId]) group[key][userId] = []

            group[key][userId].push(orderSlice)
          }

          return group
        },
        {}
      ),
    [orders]
  )

  console.log({ groupByDate })
  useEffect(() => {
    const date = new Date(orders[0].order.createdAt || '')
    const key = date.toLocaleDateString()

    setTabId(key)
  }, [orders])

  // console.log({ groupByDate })
  // console.log({ tabId })
  // console.log({ x: Object.keys(groupByDate[tabId] || []) })

  // if (isPending) return <Loading />

  // if (error) return <DataError error={error} message={dataErrorMessage} />

  Object.keys(groupByDate[tabId] || []).map(
    (key: keyof (typeof groupByDate)[typeof tabId]) => {
      console.log({ tabId })
      return key
    }
  )

  return (
    <div>
      <Tabs onSelectionChange={setTabId}>
        <TabList
          aria-label="Orders"
          className="neutral- mb-4 flex flex-wrap gap-2 border-b-2 text-sm"
        >
          {Object.keys(groupByDate).map((key: string) => (
            <Tab
              id={key}
              key={key}
              className={classnames(
                'inline-block cursor-pointer rounded-t-lg px-3 py-2',
                tabId === key
                  ? 'bg-primary-light text-primary'
                  : 'bg-transparent'
              )}
            >
              {key}
            </Tab>
          ))}
        </TabList>

        {Object.keys(groupByDate).map((key: string) => (
          <TabPanel id={key} key={key}>
            <Table
              aria-label="Orders"
              onRowAction={() => {}}
              selectionMode="multiple"
              className="w-full text-sm"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <TableHeader>
                <TableColumn isRowHeader>Student</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>

              <TableBody>
                {Object.values(groupByDate[key]).map((sliceOrders) => (
                  <Row key={sliceOrders?.[0]?.user?.id || ''}>
                    <TableCell>
                      {sliceOrders[0].user && (
                        <StudentCellWidget student={sliceOrders[0].user} />
                      )}
                    </TableCell>
                    <TableCell className="relative">
                      <div className="flex pl-7">
                        {sliceOrders.map(
                          ({ product, order }) =>
                            product && (
                              <Image
                                key={order.id}
                                alt={product.name}
                                width={52}
                                height={52}
                                src="/images/products/p-1.png"
                                className={classnames(
                                  '-ml-8 rounded-full border-2',
                                  product.published
                                    ? 'border-primary'
                                    : 'border-neutral-400'
                                )}
                              />
                            )
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {sliceOrders[0].user.id}
                      {/* <br />k {userId} */}
                      <br />
                      {/* {groupByDate?.[tabId]?.[userId]?.[0].user?.email} */}
                    </TableCell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </TabPanel>
        ))}
      </Tabs>

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
          <TableColumn isRowHeader className="">
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
              <TableCell className="text-center">
                <Checkbox slot="selection" />
              </TableCell>
              <TableCell>
                {user && <StudentCellWidget student={user} />}
              </TableCell>
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
                  amount={(
                    parseFloat(order.unitPrice) * order.quantity
                  ).toString()}
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
    </div>
  )
}

export default OrdersPage
