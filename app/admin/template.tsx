import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import BiDish from '@/icons/BiDish'
import { CONSTANTS } from '@/utils'
import BiBasket from '@/icons/BiBasket'
import BiFootball from '@/icons/BiFootball'
import AiOutlineBell from '@/icons/AiOutlineBell'
import AiOutlineHome from '@/icons/AiOutlineHome'
import AiOutlineRead from '@/icons/AiOutlineRead'
import PanelTemplate from '@/sections/PanelTemplate'
import AiOutlineUserAdd from '@/icons/AiOutlineUserAdd'
import { type SidebarLink } from '@/components/Sidebar'
import AiOutlineEuroCircle from '@/icons/AiOutlineEuroCircle'
import AiOutlineOrderedList from '@/icons/AiOutlineOrderedList'
// import VscGraph from '@/icons/VscGraph'

const links: SidebarLink[] = [
  { link: '/admin', label: 'Dashboard', icon: <AiOutlineHome /> },
  { link: '/admin/orders', label: 'Orders', icon: <AiOutlineOrderedList /> },
  {
    link: '/admin/students-requests',
    label: 'Students Requests',
    icon: <AiOutlineUserAdd />,
  },
  { link: '/admin/students', label: 'Students', icon: <AiOutlineRead /> },
  { link: '/admin/players', label: 'Players', icon: <BiFootball /> },
  {
    link: '/admin/transactions',
    label: 'Transections',
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
  if (session?.user.role !== CONSTANTS.roleName.admin) redirect('/')

  return <PanelTemplate links={links}>{children}</PanelTemplate>
}

export default Template
