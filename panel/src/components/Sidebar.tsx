type NavItem = {
  id: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '◫' },
  { id: 'analytics', label: 'Analytics', icon: '◔' },
  { id: 'users', label: 'Users', icon: '◎' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

type SidebarProps = {
  activeId: string
  onNavigate: (id: string) => void
}

export function Sidebar({ activeId, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">T</span>
        <div>
          <strong>tre panel</strong>
          <span>Admin</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Main">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              activeId === item.id ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
            }
            onClick={() => onNavigate(item.id)}
          >
            <span className="sidebar__icon" aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <p>Signed in as</p>
        <strong>admin@tre.local</strong>
      </div>
    </aside>
  )
}
