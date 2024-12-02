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
