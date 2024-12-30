import { Column, type ColumnProps } from 'react-aria-components'

import { classnames } from '@/utils'

const TableColumn = ({
  children,
  className,
  ...props
}: ColumnProps & React.RefAttributes<object>) => {
  return (
    <Column
      {...props}
      className={classnames('border-b border-neutral-300 p-2', className)}
    >
      {children}
    </Column>
  )
}

export default TableColumn
