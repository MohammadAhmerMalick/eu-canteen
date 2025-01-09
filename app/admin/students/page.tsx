'use client'

import {
  Row,
  Table,
  TableBody,
  TableHeader,
  type Selection,
  Button as AriaButton,
} from 'react-aria-components'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { classnames } from '@/utils'
import { useStore } from '@/store/provider'
import FaPlus from '@/components/icons/FaPlus'
import Button from '@/components/common/Button'
import MenuPopup from '@/components/common/Menu'
import Loading from '@/components/common/Loading'
import Checkbox from '@/components/common/Checkbox'
import MenuItem from '@/components/common/MenuItem'
import EuroChip from '@/components/common/EuroChip'
import DataError from '@/components/common/DataError'
import TableCell from '@/components/common/TableCell'
import { assetsBaseUrl } from '@/libs/assetsManagement'
import type { User } from '@/database/schema/usersSchema'
import TableColumn from '@/components/common/TableColumn'
import AiOutlineEdit from '@/components/icons/AiOutlineEdit'
import AiOutlineDelete from '@/components/icons/AiOutlineDelete'
import EditUserModal from '@/components/modals/user/EditUserModal'
import getAllStudentsAction from '@/actions/user/getAllStudentsAction'
import CreateUserModal from '@/components/modals/user/CreateUserModal'
import DeleteUserModal from '@/components/modals/user/DeleteUserModal'
import updateUsersPublishedAction from '@/actions/user/updateUsersPublishedAction'

const dataErrorMessage = 'Unable to load users'

const studentPublishOptions = [
  { id: 'published', name: 'Active' },
  { id: '', name: 'Inactive' },
]

const StudentsPage = () => {
  const { users, setUsers } = useStore((state) => state)

  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [editModalData, setEditModalData] = useState<User | null>(null)
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [deleteModalData, setDeleteModalData] = useState<User | null>(null)

  const { isPending, error, refetch } = useQuery({
    queryKey: ['getAllStudents'],
    queryFn: async () => {
      const { data, success } = await getAllStudentsAction()
      if (success) setUsers(data)
      else toast.error(dataErrorMessage)
      return data
    },
  })

  const bulkAction = (isPublished: string) => {
    const updatedUsers = users.filter(
      ({ id }) => [...selectedKeys].includes(id || '') || selectedKeys === 'all'
    )

    const updatedUserIds = updatedUsers.map((u) => u.id || '')

    updateUsersPublishedAction({
      ids: updatedUserIds,
      published: !!isPublished,
    })

    refetch()

    setSelectedKeys(new Set())
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isPending) return <Loading />

  if (error) return <DataError error={error} message={dataErrorMessage} />

  return (
    <div>
      {editModalData && (
        <EditUserModal
          student={editModalData}
          isOpen={!!editModalData}
          setOpen={() => setEditModalData(null)}
        />
      )}
      {deleteModalData && (
        <DeleteUserModal
          student={deleteModalData}
          isOpen={!!deleteModalData}
          setOpen={() => setDeleteModalData(null)}
        />
      )}
      <CreateUserModal
        isOpen={isAddModalVisible}
        setOpen={setIsAddModalVisible}
      />

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
                  {studentPublishOptions.map(({ id, name }) => (
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
          <TableColumn className="text-left">Email</TableColumn>
          <TableColumn className="text-left">Contact</TableColumn>
          <TableColumn>Matricola</TableColumn>
          <TableColumn>Credit</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>
            <Button
              className="ml-auto flex items-center gap-1 rounded-lg"
              onPress={() => setIsAddModalVisible(true)}
            >
              <FaPlus /> Student
            </Button>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {users
            .filter((u) => u.approved)
            .map((user) => (
              <Row key={user.id} id={user.id}>
                <TableCell className="w-9 text-center">
                  <Checkbox slot="selection" />
                </TableCell>
                <TableCell>
                  <div className="grid grid-cols-[40px_auto] items-center gap-2">
                    <Image
                      alt={user.name}
                      width={40}
                      height={40}
                      src={
                        user.image
                          ? `${assetsBaseUrl}${user.image}`
                          : '/images/students/s-1.png'
                      }
                      className={classnames(
                        'size-10 rounded-full border-2 bg-primary-light object-contain',
                        user.published ? 'border-primary' : 'border-neutral-400'
                      )}
                    />
                    {user.name}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell> {user.whatsapp}</TableCell>
                <TableCell className="text-center">{user.matricola}</TableCell>
                <TableCell className="text-center">
                  <EuroChip amount={user.credit} />
                </TableCell>
                <TableCell className="text-center">
                  {user.published ? (
                    <p className="text-green-700">Active</p>
                  ) : (
                    <p className="text-red-700">Inactive</p>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <AriaButton
                    onPress={() => setEditModalData(user)}
                    className="mx-1 rounded-lg bg-yellow-200 p-2 text-lg text-yellow-600 shadow"
                  >
                    <AiOutlineEdit />
                  </AriaButton>
                  <AriaButton
                    onPress={() => setDeleteModalData(user)}
                    className="mx-1 rounded-lg bg-red-200 p-2 text-lg text-red-600 shadow"
                  >
                    <AiOutlineDelete />
                  </AriaButton>
                </TableCell>
              </Row>
            ))}
        </TableBody>
      </Table>

      {!users.filter((u) => u.approved).length && (
        <div className="mt-4 space-y-2 text-center">
          <p>No user yet!</p>
          <Button
            className="mx-auto flex items-center gap-1 rounded-lg"
            onPress={() => setIsAddModalVisible(true)}
          >
            <FaPlus /> Student
          </Button>
        </div>
      )}
    </div>
  )
}

export default StudentsPage
