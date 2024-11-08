import Sidebar from '@/components/Sidebar'
import PanelHeader from '@/sections/PanelHeader'

export default function Template({ children }: { children: React.ReactNode }) {
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
        <Sidebar />
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
