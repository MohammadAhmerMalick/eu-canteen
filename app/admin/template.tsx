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
// import VscGraph from '@/icons/VscGraph'

const links: SidebarLink[] = [
  {
    link: '/admin',
    label: 'Dashboard',
    icon: <AiOutlineHome />,
  },
  {
    link: '/admin/orders',
    label: 'Orders',
    icon: <AiOutlineFile />,
  },
  { link: '/admin/students', label: 'Students', icon: <FiUsers /> },
  // {
  //   link: '/admin/analytics',
  //   label: 'Analytics',
  //   isActive: false,
  //   icon: VscGraph,
  // },
  { link: '/admin/products', label: 'Products', icon: <BiDish /> },
  {
    link: '/admin/notifications',
    label: 'Notifications',
    icon: <AiOutlineBell />,
  },
  {
    link: '/admin/categories',
    label: 'Categories',
    icon: <BiBasket />,
  },
]

interface TemplateProps {
  children: ReactNode
}

const Template = async ({ children }: TemplateProps) => {
  const session = await auth()
  if (session?.user.role !== 'admin') redirect('/')

  const styles = {
    gridTemplate: `
    'adminSideBar adminHeader' 108px
    'adminSideBar adminMain' auto
     /300px auto                 
  `,
  }
  return (
    <div className="grid" style={styles}>
      <div style={{ gridArea: 'adminSideBar' }}>
        <Sidebar links={links} />
      </div>
      <div style={{ gridArea: 'adminHeader' }}>
        <PanelHeader />
      </div>
      <main style={{ gridArea: 'adminMain' }} className="rounded-lg p-4 shadow">
        {children}
      </main>
    </div>
  )
}

export default Template
