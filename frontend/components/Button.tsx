import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="mt-6 rounded-full bg-primary px-4 py-2 text-white">
      {children}
    </button>
  )
}

export default Button
