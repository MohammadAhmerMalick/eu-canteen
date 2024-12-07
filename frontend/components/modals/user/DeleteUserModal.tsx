import Image from 'next/image'
import { FormEvent } from 'react'
import { toast } from 'react-toastify'
import type { Dispatch, SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { classnames } from '@/utils'
import Button from '@/components/common/Button'
import { assetsBaseUrl } from '@/libs/assetsManagement'
import type { User } from '@/database/schema/usersSchema'
import deleteUserAction from '@/actions/user/deleteUserAction'
import ModalContainer from '@/components/common/ModalContainer'

interface DeleteUserModalProp {
  student: User
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteUserModal = ({ isOpen, setOpen, student }: DeleteUserModalProp) => {
  const queryClient = useQueryClient()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append('id', student.id?.toString() || '')

    const { success } = await deleteUserAction(formData)
    if (success) {
      queryClient.invalidateQueries({ queryKey: ['getAllStudents'] })
      toast.success('Student Deleted')
      setOpen(false)
    } else
      toast.error('Unable to handle request right now, please contact to admin')
  }

  return (
    <ModalContainer setOpen={setOpen} isOpen={isOpen}>
      <form onSubmit={onSubmit} className="grid gap-4">
        <h1 className="text-lg font-semibold">Delete User</h1>
        <div className="grid grid-cols-2 gap-2">
          <Image
            alt={student.name}
            width={200}
            height={200}
            src={
              student.image
                ? `${assetsBaseUrl}${student.image}`
                : '/images/students/s-1.png'
            }
            className={classnames(
              'rounded-full border-2',
              student.approved ? 'border-primary' : 'border-neutral-400'
            )}
          />
          <div className="grid h-min gap-2">
            <p>
              <span className="text-primary">Name:</span> {student.name}
            </p>
            <p>
              <span className="text-primary">Email:</span> {student.email}
            </p>
            <p>
              <span className="text-primary">WhatsApp:</span> {student.whatsapp}
            </p>
            <p>
              <span className="text-primary">Matricola Number:</span>{' '}
              {student.matricola}
            </p>
            <p>
              <span className="text-primary">Status:</span>{' '}
              {student.approved ? (
                <span className="text-green-700">Active</span>
              ) : (
                <span className="text-red-700">Inactive</span>
              )}
            </p>
          </div>
        </div>
        <Button className="ml-auto w-max !py-1">Delete User</Button>
      </form>
    </ModalContainer>
  )
}

export default DeleteUserModal
