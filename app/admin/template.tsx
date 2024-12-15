import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import BiDish from '@/components/icons/BiDish'
import FiUsers from '@/components/icons/FiUsers'
import PanelHeader from '@/sections/PanelHeader'
import BiBasket from '@/components/icons/BiBasket'
import AiOutlineBell from '@/components/icons/AiOutlineBell'
import AiOutlineFile from '@/components/icons/AiOutlineFile'
import AiOutlineHome from '@/components/icons/AiOutlineHome'
import Sidebar, { type SidebarLink } from '@/components/Sidebar'
import AiOutlineEuroCircle from '@/components/icons/AiOutlineEuroCircle'
// import VscGraph from '@/icons/VscGraph'

const links: SidebarLink[] = [
  { link: '/admin', label: 'Dashboard', icon: <AiOutlineHome /> },
  { link: '/admin/orders', label: 'Orders', icon: <AiOutlineFile /> },
  {
    link: '/admin/students-requests',
    label: 'Students Requests',
    icon: <FiUsers />,
  },
  { link: '/admin/students', label: 'Students', icon: <FiUsers /> },
  { link: '/admin/players', label: 'Players', icon: <FiUsers /> },
  {
    link: '/admin/students-transactions',
    label: 'Students Transections',
    icon: <AiOutlineEuroCircle />,
  },
  {
    link: '/admin/players-transactions',
    label: 'Players Transections',
    icon: <AiOutlineEuroCircle />,
  },
  // {
  //   link: '/admin/analytics',
  //   label: 'Analytics',
  //   isActive: false,
  //   icon: VscGraph,
  // },
  { link: '/admin/products', label: 'Products', icon: <BiDish /> },
  { link: '/admin/categories', label: 'Categories', icon: <BiBasket /> },
  {
    link: '/admin/notifications',
    label: 'Notifications',
    icon: <AiOutlineBell />,
  },
]

interface TemplateProps {
  children: ReactNode
}

const Template = async ({ children }: TemplateProps) => {
  const session = await auth()
  if (session?.user.role !== 'admin') redirect('/')

  return (
    <div className="relative grid h-screen grid-cols-[84px_auto] overflow-hidden md:grid-cols-[300px_auto]">
      <Sidebar links={links} isAdmin />
      <div className="overflow-auto">
        <PanelHeader />
        <main className="m-1 rounded-lg p-4 shadow">{children}</main>
      </div>
    </div>
  )
}

export default Template
