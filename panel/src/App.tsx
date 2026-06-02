import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import './App.css'

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Overview of your workspace at a glance.',
  },
  analytics: {
    title: 'Analytics',
    subtitle: 'Deeper metrics and trends.',
  },
  users: {
    title: 'Users',
    subtitle: 'Manage accounts and permissions.',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Configure your panel preferences.',
  },
}

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const meta = pageMeta[activePage] ?? pageMeta.dashboard

  return (
    <div className="app">
      <Sidebar activeId={activePage} onNavigate={setActivePage} />
      <div className="main">
        <Header title={meta.title} subtitle={meta.subtitle} />
        <main className="content">
          {activePage === 'dashboard' ? (
            <Dashboard />
          ) : (
            <section className="placeholder-view">
              <h2>{meta.title}</h2>
              <p>This section is ready for you to extend with real data and features.</p>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
