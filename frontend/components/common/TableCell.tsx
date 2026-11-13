import { Cell, type CellProps } from 'react-aria-components'

import { classnames } from '@/utils'

const TableCell = ({
  children,
  className,
  ...props
}: CellProps &
  React.RefAttributes<HTMLDivElement | HTMLTableCellElement>) => {
  return (
    <Cell
      {...props}
      className={classnames('border-b border-neutral-300 p-2', className)}
    >
      {children}
    </Cell>
  )
}

export default TableCell
