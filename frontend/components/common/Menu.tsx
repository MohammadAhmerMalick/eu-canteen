'use client'

import {
  Menu,
  Button,
  Popover,
  MenuTrigger,
  type MenuItemProps,
} from 'react-aria-components'
import { classnames } from '@/utils'

import AiOutlineMenu from '@/icons/AiOutlineMenu'

const MenuPopup = ({ children }: MenuItemProps) => {
  return (
    <MenuTrigger>
      <Button
        aria-label="Menu"
        className={({ isPressed, isFocusVisible }) =>
          classnames(
            'flex size-8 items-center justify-center rounded-lg border border-primary-light bg-primary-light p-2 text-lg text-primary shadow',
            isPressed && 'border border-primary'
          )
        }
      >
        <AiOutlineMenu />
      </Button>
      <Popover className="rounded-lg bg-white/30 p-1 shadow-lg ring-neutral-300 backdrop-blur">
        <Menu className="outline-0">{children}</Menu>
      </Popover>
    </MenuTrigger>
  )
}

export default MenuPopup
