import { Suspense, type ReactNode } from 'react'

import PanelHeader from '@/sections/PanelHeader'
import Loading from '@/components/common/Loading'
import Sidebar, { type SidebarLink } from '@/components/Sidebar'

interface PanelTemplateProps {
  links: SidebarLink[]
  children: ReactNode
}

const PanelTemplate = ({ links, children }: PanelTemplateProps) => {
  return (
    <div className="relative grid h-screen grid-cols-[69px_auto] overflow-hidden md:grid-cols-[300px_auto]">
      <Sidebar links={links} />
      <div className="overflow-auto">
        <PanelHeader />
        <Suspense fallback={<Loading />}>
          <main
            className="m-1 rounded-lg p-2 md:p-4 md:shadow"
            style={{ minHeight: 'calc(100% - 117px)' }}
          >
            {children}
          </main>
        </Suspense>
      </div>
    </div>
  )
}

export default PanelTemplate
