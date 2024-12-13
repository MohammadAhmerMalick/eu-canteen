import {
  Button,
  Select,
  ListBox,
  Popover,
  SelectValue,
  ListBoxItem,
  type Key,
} from 'react-aria-components'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { classnames } from '@/utils'

const LanguageSelector = () => {
  const [selected, setSelected] = useState<Key>('english')

  const onSelectionChange = (key: Key) => {
    if (key === 'italiano') toast.warn('🇮🇹 ITALIANO currently not available')
    setSelected('english')
  }

  return (
    <Select
      defaultSelectedKey={selected}
      selectedKey={selected}
      onSelectionChange={onSelectionChange}
    >
      <Button
        className={({ isPressed }) =>
          classnames(
            'flex w-full items-center justify-between gap-2 rounded-3xl border border-neutral-300 bg-white px-2 py-1 text-neutral-900 md:px-4 md:py-2',
            isPressed && 'border-primary ring-1 ring-orange-300'
          )
        }
      >
        <SelectValue className="flex items-center gap-2" />
      </Button>
      <Popover>
        <ListBox className="rounded-lg bg-white/70 p-1 px-4 shadow-lg ring-[1px] ring-neutral-300 backdrop-blur">
          <ListBoxItem id="italiano" className="flex cursor-pointer gap-2 py-1">
            <span className="text-xl">🇮🇹</span>{' '}
            <span className="text-sm md:text-base">ITALIANO</span>
          </ListBoxItem>
          <ListBoxItem id="english" className="flex cursor-pointer gap-2 py-1">
            <span className="text-xl">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>{' '}
            <span className="text-sm md:text-base">ENGLISH</span>
          </ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  )
}

export default LanguageSelector
