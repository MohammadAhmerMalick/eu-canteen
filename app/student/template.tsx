import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { CONSTANTS } from '@/utils'
import BiDish from '@/components/icons/BiDish'
import FiUsers from '@/components/icons/FiUsers'
import FaqIcon from '@/components/icons/FaqIcon'
import PanelHeader from '@/sections/PanelHeader'
// import BsCreditCard from '@/components/icons/BsCreditCard'
import AiOutlineBell from '@/components/icons/AiOutlineBell'
import Sidebar, { type SidebarLink } from '@/components/Sidebar'
import AiOutlineOrderedList from '@/components/icons/AiOutlineOrderedList'

const links: SidebarLink[] = [
  { link: '/student/menu', label: 'Menu', icon: <BiDish /> },
  { link: '/student', label: 'Profile', icon: <FiUsers /> },
  {
    link: '/student/orders',
    label: 'My Orders',
    icon: <AiOutlineOrderedList />,
  },
  // { link: '/student/credits', label: 'Credits', icon: <BsCreditCard /> },
  {
    link: '/student/notifications',
    label: 'Notifications',
    icon: <AiOutlineBell />,
  },
  { link: '/student/faqs', label: 'FAQs', icon: <FaqIcon /> },
]

interface TemplateProps {
  children: ReactNode
}

const Template = async ({ children }: TemplateProps) => {
  const session = await auth()

  if (
    !(
      session?.user.role === CONSTANTS.roleName.player ||
      session?.user.role === CONSTANTS.roleName.student
    )
  )
    redirect('/')

  return (
    <div className="relative grid h-screen grid-cols-[84px_auto] overflow-hidden md:grid-cols-[300px_auto]">
      <Sidebar links={links} />
      <div className="overflow-auto">
        <PanelHeader />
        <main className="m-1 rounded-lg p-4 shadow">{children}</main>
      </div>
    </div>
  )
}

export default Template
