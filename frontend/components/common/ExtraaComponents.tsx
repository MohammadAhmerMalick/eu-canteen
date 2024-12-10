import { classnames } from '@/utils'
import { type ReactNode } from 'react'

interface HeadingProps {
  className?: string
  children: ReactNode
}
export const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h2 className={classnames('mb-2 mt-4 text-lg font-semibold', className)}>
      {children}
    </h2>
  )
}

interface SubHeadingProps {
  children: ReactNode
}
export const SubHeading = ({ children }: SubHeadingProps) => {
  return <h2 className="my-2 text-base font-medium">{children}</h2>
}

interface ParaProps {
  children: ReactNode
}
export const Para = ({ children }: ParaProps) => {
  return <p className="pb-2">{children}</p>
}

interface ListsProps {
  children: ReactNode
}
export const Lists = ({ children }: ListsProps) => {
  return <ul className="mb-2 ml-8 list-disc space-y-2">{children}</ul>
}
