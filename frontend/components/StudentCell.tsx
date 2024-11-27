import Image from 'next/image'

import { classnames } from '@/utils'
import usersTable from '@/database/schema/usersSchema'

interface StudentCellProps {
  student: typeof usersTable.$inferInsert
}

const StudentCell = ({ student }: StudentCellProps) => {
  return (
    <div className="w-max min-w-full rounded-lg bg-primary-light px-4 py-2">
      <div className="flex gap-4">
        <Image
          alt={student.name}
          width={52}
          height={52}
          src="/images/students/s-1.png"
          className={classnames(
            'rounded-full border-2',
            student.approved ? 'border-primary' : 'border-neutral-400'
          )}
        />
        <div className="text-xs">
          <p className="text-sm font-semibold">{student.name}</p>
          <p className="font-semibold">ID: {student.matricola}</p>
          <p>{student.email}</p>
        </div>
      </div>
    </div>
  )
}

export default StudentCell
