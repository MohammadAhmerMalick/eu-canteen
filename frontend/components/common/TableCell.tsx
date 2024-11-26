import { Cell, CellProps } from 'react-aria-components'

const TableCell = ({
  children,
  ...props
}: CellProps & React.RefAttributes<object>) => {
  return (
    <Cell {...props} className="w-1 border-b border-neutral-300 p-2">
      {children}
    </Cell>
  )
}

export default TableCell
