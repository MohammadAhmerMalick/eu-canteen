'use client'

import { useStore } from '@/store/provider'
import StudentCell from '@/components/StudentCell'
import ProductCell from '@/components/ProductCell'
import AiOutlineFieldTime from '@/components/icons/AiOutlineFieldTime'
import AiOutlineEdit from '@/components/icons/AiOutlineEdit'

const OrdersPage = () => {
  const { users, products } = useStore((state) => state)

  if (!(users.length && products.length)) return 'loading'

  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <td className="border-b border-neutral-300 p-2">Student</td>
            <td className="border-b border-neutral-300 p-2">Product</td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Order Type
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Quantity
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Placed At
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Price
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Status
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-1 border-b border-neutral-300 p-2">
              <StudentCell student={users[0]} />
            </td>
            <td className="w-1 border-b border-neutral-300 p-2">
              <ProductCell product={products[0]} />
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Takeaway
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">20</td>
            <td className="border-b border-neutral-300 p-2 text-center">
              19 hours ago
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              <span className="rounded-lg bg-primary-light p-2 text-primary">
                €5.09
              </span>
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              <span className="flex items-center gap-1">
                <AiOutlineFieldTime />
                {/* <BiDish />
                <AiOutlineCheck />
                <AiOutlineClose /> */}
                Waiting
              </span>
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              <button
                onClick={() => {}}
                className="mx-1 rounded-lg bg-yellow-200 p-2 text-lg text-yellow-600 shadow"
              >
                <AiOutlineEdit />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OrdersPage
