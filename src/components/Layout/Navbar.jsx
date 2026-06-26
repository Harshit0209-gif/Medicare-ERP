import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown, LogOut, User, Settings } from 'lucide-react'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/inventory': 'Inventory Management',
  '/sales': 'Sales & Billing',
  '/suppliers': 'Suppliers & Purchase Orders',
  '/reports': 'Reports & Analytics',
  '/settings': 'Settings',
}

export default function Navbar({ user, onLogout }) {
  const location = useLocation()
  const [showUser, setShowUser] = useState(false)

  const title = pageTitles[location.pathname] || 'Medicare ERP'

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-30">
      {/* Page title */}
      <div>
        <h1 className="text-[20px] font-semibold text-txt-primary">{title}</h1>

      </div>

      {/* User menu */}
      <div className="relative">
        <button
          onClick={() => setShowUser(s => !s)}
          className="flex items-center gap-2 px-3 py-2 rounded-btn hover:bg-app transition-colors"
        >
          <div className="text-right hidden md:block">
            <p className="text-[13px] font-semibold text-txt-primary leading-tight">{user?.name}</p>
            <p className="text-[11px] text-txt-muted">{user?.role}</p>
          </div>
        </button>


      </div>
    </header>
  )
}
