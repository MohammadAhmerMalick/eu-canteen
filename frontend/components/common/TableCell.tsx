import { classnames } from '@/utils'
import { Cell, CellProps } from 'react-aria-components'

const TableCell = ({
  children,
  className,
  ...props
}: CellProps & React.RefAttributes<object>) => {
  return (
    <Cell
      {...props}
      className={classnames('w-1 border-b border-neutral-300 p-2', className)}
    >
      {children}
    </Cell>
  )
}

export default TableCell
