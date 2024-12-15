import type { Dispatch, ReactNode, SetStateAction } from 'react'

import FaCheck from '@/icons/FaCheck'
import ModalContainer from '@/components/common/ModalContainer'

interface RegistrationSuccessProp {
  isOpen: boolean
  children: ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
}

const RegistrationSuccess = ({
  isOpen,
  setOpen,
  children,
}: RegistrationSuccessProp) => {
  return (
    <ModalContainer
      isOpen={isOpen}
      setOpen={setOpen}
      className="grid min-h-80 max-w-xl place-items-center text-center"
    >
      <div className="space-y-10">
        <div className="mx-auto w-min rounded-full bg-primary-light p-4 text-4xl text-primary">
          <FaCheck />
        </div>

        <div className="space-y-4">
          <p className="text-xl font-semibold">Thank you for Registration!</p>
          {children}
        </div>
      </div>
    </ModalContainer>
  )
}

export default RegistrationSuccess
