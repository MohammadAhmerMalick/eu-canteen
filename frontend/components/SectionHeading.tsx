import { ReactNode } from 'react'

interface SectionHeadingProps {
  children: ReactNode
}

const SectionHeading = ({ children }: SectionHeadingProps) => {
  return (
    <h2 className="bellota-light max-w-lg text-3xl uppercase text-orange-900">
      {children}
    </h2>
  )
}

export default SectionHeading
