import Image from 'next/image'

import BiFootball from '@/icons/BiFootball'
import { classnames, CONSTANTS } from '@/utils'
import FaGraduationCap from '@/icons/FaGraduationCap'
import type { User } from '@/database/schema/usersSchema'

interface UserCellWidgetProps {
  user: User
}

const UserCellWidget = ({ user }: UserCellWidgetProps) => {
  return (
    <div className="w-max min-w-full rounded-lg bg-primary-light p-2">
      <div className="flex gap-4">
        <Image
          width={52}
          height={52}
          alt={user.name}
          src="/images/students/s-1.png"
          className={classnames(
            'rounded-full border-2',
            user.approved ? 'border-primary' : 'border-neutral-400'
          )}
        />
        <div className="text-xs">
          <p className="flex items-center gap-2 text-sm font-semibold">
            {user.roleName === CONSTANTS.roleName.player ? (
              <BiFootball />
            ) : (
              <FaGraduationCap />
            )}
            {user.name}
          </p>

          {user.roleName === CONSTANTS.roleName.player ? (
            <p className="font-semibold">Whatsapp: {user.whatsapp}</p>
          ) : (
            <p className="font-semibold">ID: {user.matricola}</p>
          )}
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  )
}

export default UserCellWidget
