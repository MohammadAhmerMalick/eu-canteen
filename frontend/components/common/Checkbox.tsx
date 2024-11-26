import { Checkbox as AriaCheckbox, CheckboxProps } from 'react-aria-components'

import { classnames } from '@/utils'
import FaCheck from '@/icons/FaCheck'

const Checkbox = ({ children, ...props }: CheckboxProps) => {
  return (
    <AriaCheckbox {...props}>
      {({ isSelected }) => (
        <>
          <div
            className={classnames(
              'flex size-6 items-center justify-center rounded-lg border-2 border-primary text-xs text-primary'
            )}
          >
            {isSelected ? <FaCheck /> : <polyline points="1 9 7 14 15 4" />}
          </div>
          {children}
        </>
      )}
    </AriaCheckbox>
  )
}

export default Checkbox
