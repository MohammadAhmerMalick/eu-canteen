'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { classnames } from '@/utils'
import FaPlus from '@/components/icons/FaPlus'
import Button from '@/components/common/Button'
import usersTable from '@/database/schema/usersSchema'
import AiOutlineEdit from '@/components/icons/AiOutlineEdit'
import getStudentsActions from '@/actions/getStudentsActions'
import EditUserModal from '@/components/modals/EditUserModal'
import AiOutlineDelete from '@/components/icons/AiOutlineDelete'
import CreateUserModal from '@/components/modals/createUserModal'
import DeleteUserModal from '@/components/modals/DeleteUserModal'

const StudentsPage = () => {
  const [students, setStudents] = useState<(typeof usersTable.$inferInsert)[]>(
    []
  )
  const [editModaldata, setEditModaldata] = useState<
    typeof usersTable.$inferInsert | null
  >(null)
  const [deleteModaldata, setDeleteModaldata] = useState<
    typeof usersTable.$inferInsert | null
  >(null)
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false)

  const getStudents = useCallback(async () => {
    const { data } = await getStudentsActions()
    setStudents(data)
  }, [])

  useEffect(() => {
    getStudents()
  }, [getStudents])

  return (
    <div>
      {editModaldata && (
        <EditUserModal
          student={editModaldata}
          onClose={() => setEditModaldata(null)}
        />
      )}
      {deleteModaldata && (
        <DeleteUserModal
          student={deleteModaldata}
          onClose={() => setDeleteModaldata(null)}
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
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border-b border-neutral-300 p-2">
                <div className="grid grid-cols-[40px_auto] items-center gap-2">
                  <Image
                    alt={student.name}
                    width={40}
                    height={40}
                    src="/images/students/s-1.png"
                    className={classnames(
                      'rounded-full border-2',
                      student.approved ? 'border-primary' : 'border-neutral-400'
                    )}
                  />
                  {student.name}
                </div>
              </td>
              <td className="border-b border-neutral-300 p-2">
                {student.email}
              </td>
              <td className="border-b border-neutral-300 p-2">
                {student.whatsapp}
              </td>
              <td className="border-b border-neutral-300 p-2">
                {student.matricola}
              </td>
              <td className="border-b border-neutral-300 p-2 text-center font-semibold">
                {student.approved ? (
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
                  src={`/images/students/id-cards/${student.idCardFrontImage}`}
                  className="mx-1 inline"
                />
                <Image
                  alt="name"
                  width={40}
                  height={40}
                  src={`/images/students/id-cards/${student.idCardBackImage}`}
                  className="mx-1 inline"
                />
              </td>
              <td className="border-b border-neutral-300 p-2 text-center">
                <button
                  onClick={() => setEditModaldata(student)}
                  className="mx-1 rounded-lg bg-yellow-200 p-2 text-lg text-yellow-600 shadow"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => setDeleteModaldata(student)}
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
