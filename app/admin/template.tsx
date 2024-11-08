import Sidebar from '@/components/Sidebar'
import PanelHeader from '@/sections/PanelHeader'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateAreas: `
                    'adminSideBar adminHeader'
                    'adminSideBar adminMain'                    
                   `,
      }}
    >
      <div style={{ gridArea: 'adminSideBar' }}>
        <Sidebar />
      </div>
      <div style={{ gridArea: 'adminHeader' }}>
        <PanelHeader />
      </div>
      <main style={{ gridArea: 'adminMain' }}>{children}</main>
    </div>
  )
}
