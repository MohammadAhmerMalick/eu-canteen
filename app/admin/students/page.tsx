'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import FaPlus from '@/components/icons/FaPlus'
import Button from '@/components/common/Button'
import usersTable from '@/database/schema/usersSchema'
import AiOutlineEdit from '@/components/icons/AiOutlineEdit'
import getStudentsAction from '@/actions/getStudentsAction'
import AiOutlineDelete from '@/components/icons/AiOutlineDelete'
import EditUserModal from '@/components/modals/user/EditUserModal'
import CreateUserModal from '@/components/modals/user/CreateUserModal'
import DeleteUserModal from '@/components/modals/user/DeleteUserModal'

const StudentsPage = () => {
  const { users, setUsers } = useStore((state) => state)

  const [editModalData, setEditModalData] = useState<
    typeof usersTable.$inferInsert | null
  >(null)
  const [deleteModalData, setDeleteModalData] = useState<
    typeof usersTable.$inferInsert | null
  >(null)
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false)

  const getStudents = useCallback(async () => {
    const { data } = await getStudentsAction()
    setUsers(data)
  }, [setUsers])

  useEffect(() => {
    if (!users.length) getStudents()
  }, [getStudents, users.length])

  return (
    <div>
      {editModalData && (
        <EditUserModal
          student={editModalData}
          onClose={() => setEditModalData(null)}
        />
      )}
      {deleteModalData && (
        <DeleteUserModal
          student={deleteModalData}
          onClose={() => setDeleteModalData(null)}
        />
      )}
      {isAddUserModalVisible && (
        <CreateUserModal onClose={() => setIsAddUserModalVisible(false)} />
      )}
      <table className="w-full text-sm">
        <thead>
          <tr>
            <td className="border-b border-neutral-300 p-2">Name</td>
            <td className="border-b border-neutral-300 p-2">Mail</td>
            <td className="border-b border-neutral-300 p-2">Contact</td>
            <td className="border-b border-neutral-300 p-2">Matricola</td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Student ID
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              Status
            </td>
            <td className="border-b border-neutral-300 p-2 text-center">
              <Button
                className="mx-auto flex items-center gap-1 rounded-lg"
                onClick={() => setIsAddUserModalVisible(true)}
              >
                <FaPlus /> Add Student
              </Button>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-b border-neutral-300 p-2">
                <div className="grid grid-cols-[40px_auto] items-center gap-2">
                  <Image
                    alt={user.name}
                    width={40}
                    height={40}
                    src="/images/students/s-1.png"
                    className={classnames(
                      'rounded-full border-2',
                      user.approved ? 'border-primary' : 'border-neutral-400'
                    )}
                  />
                  {user.name}
                </div>
              </td>
              <td className="border-b border-neutral-300 p-2">{user.email}</td>
              <td className="border-b border-neutral-300 p-2">
                {user.whatsapp}
              </td>
              <td className="border-b border-neutral-300 p-2">
                {user.matricola}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center font-semibold">
                {user.approved ? (
                  <p className="text-green-700">Active</p>
                ) : (
                  <p className="text-red-700">Inactive</p>
                )}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                <Image
                  alt="name"
                  width={40}
                  height={40}
                  src={`/images/students/id-cards/${user.idCardFrontImage}`}
                  className="mx-1 inline"
                />
                <Image
                  alt="name"
                  width={40}
                  height={40}
                  src={`/images/students/id-cards/${user.idCardBackImage}`}
                  className="mx-1 inline"
                />
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                <button
                  onClick={() => setEditModalData(user)}
                  className="mx-1 rounded-lg bg-yellow-200 p-2 text-lg text-yellow-600 shadow"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => setDeleteModalData(user)}
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

export default StudentsPage
