import { ReactNode } from 'react'

interface ChipPorps {
  children: ReactNode
}

const Chip = ({ children }: ChipPorps) => {
  return (
    <span className="inline-block rounded-lg bg-primary-light p-2 text-primary">
      {children}
    </span>
  )
}

export default Chip
