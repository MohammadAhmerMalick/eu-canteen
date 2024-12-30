import { type ReactNode } from 'react'
import { Button, Disclosure, DisclosurePanel } from 'react-aria-components'

import AiOutlinePlus from '@/icons/AiOutlinePlus'
import AiOutlineMinus from '@/icons/AiOutlineMinus'

interface AccordionProps {
  id: string
  heading: string
  children: ReactNode
}
const Accordion = ({ id, heading, children }: AccordionProps) => {
  return (
    <Disclosure
      id={id}
      className="rounded-lg border border-neutral-300 bg-white p-4"
    >
      {({ isExpanded }) => (
        <>
          <Button
            slot="trigger"
            className="w-full text-left text-base font-semibold"
          >
            <span className="flex items-center justify-between">
              {heading}
              {isExpanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </span>
          </Button>
          <DisclosurePanel>
            <p className="mt-2 text-left text-sm font-normal">{children}</p>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

export default Accordion
