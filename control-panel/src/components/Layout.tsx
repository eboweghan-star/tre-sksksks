import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/users': 'Users',
  '/system': 'System',
  '/logs': 'Logs',
  '/settings': 'Settings',
}

export function Layout() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? 'Control Panel'

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header title={title} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
