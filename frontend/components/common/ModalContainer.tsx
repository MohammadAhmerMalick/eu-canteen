import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { Dialog, Modal, ModalOverlay } from 'react-aria-components'

interface ModalContainerProps {
  isOpen: boolean
  children: ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
}
const ModalContainer = ({ setOpen, children, isOpen }: ModalContainerProps) => {
  return (
    <ModalOverlay
      isDismissable
      isOpen={isOpen}
      onOpenChange={setOpen}
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur md:p-4"
    >
      <Modal className="max-w-3xl rounded-lg bg-white p-3 shadow-lg backdrop-blur-sm md:p-4">
        <Dialog>{children}</Dialog>
      </Modal>
    </ModalOverlay>
  )
}

export default ModalContainer
