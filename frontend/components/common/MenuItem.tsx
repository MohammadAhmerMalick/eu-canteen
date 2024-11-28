import {
  type MenuItemProps,
  MenuItem as AriaMenuItem,
} from 'react-aria-components'

import { classnames } from '@/utils'

const MenuItem = ({ children, ...props }: MenuItemProps) => {
  return (
    <AriaMenuItem
      {...props}
      className={({ isSelected, isHovered }) =>
        classnames(
          'cursor-pointer rounded-lg px-3 py-2 font-normal outline-none duration-100',
          isHovered ? 'bg-primary-light shadow' : '',
          isSelected ? '!bg-primary' : ''
        )
      }
    >
      {children}
    </AriaMenuItem>
  )
}

export default MenuItem
