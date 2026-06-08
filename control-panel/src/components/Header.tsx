import { Bell, Search } from 'lucide-react'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        <div className="header-search">
          <Search size={15} />
          <input type="text" placeholder="Search..." />
        </div>
        <button type="button" className="icon-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className="avatar">AD</div>
      </div>
    </header>
  )
}
