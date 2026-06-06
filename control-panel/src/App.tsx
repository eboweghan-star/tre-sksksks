import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Users } from './pages/Users'
import { System } from './pages/System'
import { Logs } from './pages/Logs'
import { Settings } from './pages/Settings'
import { Loader } from './pages/Loader'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="loader" element={<Loader />} />
          <Route path="users" element={<Users />} />
          <Route path="system" element={<System />} />
          <Route path="logs" element={<Logs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
