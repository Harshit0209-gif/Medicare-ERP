import { useState, useRef, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

export default function Layout({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mainRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-app">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        user={user}
        onLogout={onLogout}
      />

      {/* Main content area */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'lg:ml-[70px]' : 'lg:ml-[240px]'}`}
      >
        <Navbar
          user={user}
          onLogout={onLogout}
          onMenuOpen={() => setMobileOpen(true)}
        />
        <main ref={mainRef} className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      <BottomNav onMenuOpen={() => setMobileOpen(true)} />
    </div>
  )
}
