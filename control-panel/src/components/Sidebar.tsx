import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Settings,
  Server,
  ScrollText,
  SlidersHorizontal,
  Zap,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/loader', label: 'Loader', icon: Zap },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/system', label: 'System', icon: Server },
  { to: '/logs', label: 'Logs', icon: ScrollText },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <SlidersHorizontal size={18} />
        </div>
        <span className="sidebar-brand-text">Control Panel</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `nav-link${isActive ? ' active' : ''}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-footer-text">v1.0.0 · All systems operational</p>
      </div>
    </aside>
  )
}
