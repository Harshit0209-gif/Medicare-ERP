import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown, LogOut, User, Settings, Menu } from 'lucide-react'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/inventory': 'Inventory',
  '/sales':     'Sales & Billing',
  '/suppliers': 'Suppliers',
  '/accounts':  'Accounts',
  '/reports':   'Reports',
  '/settings':  'Settings',
}

export default function Navbar({ user, onLogout, onMenuOpen }) {
  const location = useLocation()
  const [showUser, setShowUser] = useState(false)
  const title = pageTitles[location.pathname] || 'Medicare ERP'

  return (
    <header className="h-14 lg:h-16 bg-white border-b border-border flex items-center gap-3 px-4 lg:px-6 flex-shrink-0 sticky top-0 z-30">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuOpen}
        className="lg:hidden p-2 rounded-lg text-txt-secondary hover:bg-slate-100 transition-colors flex-shrink-0"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[16px] lg:text-[20px] font-semibold text-txt-primary truncate">{title}</h1>
        <p className="text-[11px] text-txt-muted hidden sm:block">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* User menu */}
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setShowUser(s => !s)}
          className="flex items-center gap-1.5 px-2 py-1.5 lg:px-3 lg:py-2 rounded-btn hover:bg-app transition-colors"
        >
          {/* Avatar circle — mobile */}
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 lg:hidden">
            <span className="text-primary text-[12px] font-bold">
              {user?.name?.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </span>
          </div>
          {/* Name + role — desktop */}
          <div className="text-right hidden lg:block">
            <p className="text-[13px] font-semibold text-txt-primary leading-tight">{user?.name}</p>
            <p className="text-[11px] text-txt-muted">{user?.role}</p>
          </div>
          <ChevronDown size={13} className={`text-txt-muted transition-transform duration-200 ${showUser ? 'rotate-180' : ''}`} />
        </button>

        {showUser && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setShowUser(false)} />
            <div className="absolute right-0 top-11 lg:top-12 w-48 bg-white rounded-xl shadow-dropdown border border-border z-40 animate-fadeIn overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-[13px] font-semibold text-txt-primary truncate">{user?.name}</p>
                <p className="text-[11px] text-txt-muted truncate">{user?.email}</p>
              </div>
              <div className="py-1">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-txt-secondary hover:bg-app hover:text-txt-primary transition-colors">
                  <User size={14} />My Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-txt-secondary hover:bg-app hover:text-txt-primary transition-colors">
                  <Settings size={14} />Settings
                </button>
              </div>
              <div className="border-t border-border py-1">
                <button
                  onClick={() => { setShowUser(false); onLogout() }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-danger hover:bg-red-50 transition-colors font-medium"
                >
                  <LogOut size={14} />Sign Out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
