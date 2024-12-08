import { Checkbox as AriaCheckbox, CheckboxProps } from 'react-aria-components'

import { classnames } from '@/utils'
import FaCheck from '@/icons/FaCheck'

const Checkbox = ({ children, className, ...props }: CheckboxProps) => {
  return (
    <AriaCheckbox {...props}>
      {({ isSelected }) => (
        <>
          <div
            className={classnames(
              'flex size-5 items-center justify-center rounded-lg border-2 border-primary text-xs text-primary',
              className
            )}
          >
            {isSelected ? <FaCheck /> : <span />}
          </div>
          {children}
        </>
      )}
    </AriaCheckbox>
  )
}

export default Checkbox
