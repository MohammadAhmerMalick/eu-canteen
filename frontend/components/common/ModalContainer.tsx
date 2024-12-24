import { classnames } from '@/utils'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { Dialog, Modal, ModalOverlay } from 'react-aria-components'

interface ModalContainerProps {
  isOpen: boolean
  className?: string
  children: ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ModalContainer = ({
  isOpen,
  children,
  className,
  setOpen,
}: ModalContainerProps) => {
  return (
    <ModalOverlay
      isDismissable
      isOpen={isOpen}
      onOpenChange={setOpen}
      className={({ defaultClassName }) =>
        classnames(
          defaultClassName,
          'fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur md:p-4'
        )
      }
    >
      <Modal
        className={({ defaultClassName }) =>
          classnames(
            defaultClassName,
            'max-h-full max-w-3xl overflow-auto rounded-lg bg-white p-3 shadow-lg backdrop-blur-sm md:rounded-3xl md:p-6',
            className
          )
        }
      >
        <Dialog>{children}</Dialog>
      </Modal>
    </ModalOverlay>
  )
}

export default ModalContainer
