'use client'

import { classnames } from '@/utils'
import {
  ListBoxItem,
  ListBoxItemProps,
  SelectProps,
  Select as AriaSelect,
  Label,
  Button,
  SelectValue,
  Popover,
  ListBox,
} from 'react-aria-components'

interface MySelectProps<T extends object>
  extends Omit<SelectProps<T>, 'children'> {
  label?: string
  items?: { name: string; id: string }[]
}

export function MyItem({ children, ...props }: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isSelected, isHovered }) =>
        classnames(
          'cursor-pointer rounded-lg px-2 py-1 font-normal outline-none duration-100',
          isHovered ? 'bg-primary-light' : '',
          isSelected ? '!bg-primary text-white' : ''
        )
      }
    >
      {children}
    </ListBoxItem>
  )
}

export function Select1<T extends object>({
  label,
  items,
  ...props
}: MySelectProps<T>) {
  return (
    <AriaSelect {...props}>
      <Label>{label}</Label>
      <Button
        className={({ isPressed }) =>
          classnames(
            'flex w-full items-center justify-between rounded-md border border-neutral-300 bg-white p-2 text-neutral-900',
            isPressed && 'border-primary ring-1 ring-orange-300'
          )
        }
      >
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox
          items={items}
          className="rounded-lg bg-white/70 p-1 shadow-lg ring-[1px] ring-neutral-300 backdrop-blur"
        >
          {(item) => <MyItem>{item.name}</MyItem>}
        </ListBox>
      </Popover>
    </AriaSelect>
  )
}

// export default Select
