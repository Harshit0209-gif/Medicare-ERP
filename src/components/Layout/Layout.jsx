import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function Layout({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-app flex">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} user={user} onLogout={onLogout} />

      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ marginLeft: collapsed ? '70px' : '240px' }}
      >
        <Navbar user={user} onLogout={onLogout} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
