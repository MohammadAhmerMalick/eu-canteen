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
        className={({ isPressed }) =>
          classnames(
            'flex size-8 items-center justify-center rounded-lg border bg-primary-light p-2 text-lg text-primary shadow',
            isPressed ? 'border-primary' : 'border-primary-light'
          )
        }
      >
        <AiOutlineMenu />
      </Button>
      <Popover className="rounded-lg bg-white/70 p-2 shadow-lg ring-[1px] ring-neutral-300 backdrop-blur">
        <Menu>{children}</Menu>
      </Popover>
    </MenuTrigger>
  )
}

export default MenuPopup
