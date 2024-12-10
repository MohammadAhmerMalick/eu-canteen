import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import BiDish from '@/components/icons/BiDish'
import FiUsers from '@/components/icons/FiUsers'
import PanelHeader from '@/sections/PanelHeader'
import BsCreditCard from '@/components/icons/BsCreditCard'
import AiOutlineFile from '@/components/icons/AiOutlineFile'
import AiOutlineBell from '@/components/icons/AiOutlineBell'
import Sidebar, { type SidebarLink } from '@/components/Sidebar'

const links: SidebarLink[] = [
  { link: '/student/menu', label: 'Menu', icon: <BiDish /> },
  { link: '/student', label: 'Profile', icon: <FiUsers /> },
  { link: '/student/orders', label: 'My Orders', icon: <AiOutlineFile /> },
  { link: '/student/credits', label: 'Credits', icon: <BsCreditCard /> },
  {
    link: '/student/notifications',
    label: 'Notifications',
    icon: <AiOutlineBell />,
  },
]

interface TemplateProps {
  children: ReactNode
}

const Template = async ({ children }: TemplateProps) => {
  const session = await auth()

  if (session?.user.role !== 'student') redirect('/')

  return (
    <div className="relative grid h-screen grid-cols-[84px_auto] overflow-hidden md:grid-cols-[300px_auto]">
      <Sidebar links={links} />
      <div className="overflow-auto">
        <PanelHeader />
        <main className="rounded-lg p-4 shadow">{children}</main>
      </div>
    </div>
  )
}

export default Template
