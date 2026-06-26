import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Package, ShoppingCart, Truck,
  BarChart2, Settings, ChevronLeft, ChevronRight, LogOut,
} from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Inventory',  to: '/inventory',  icon: Package },
  { label: 'Sales',      to: '/sales',      icon: ShoppingCart },
  { label: 'Suppliers',  to: '/suppliers',  icon: Truck },
  { label: 'Reports',    to: '/reports',    icon: BarChart2 },
  { label: 'Settings',   to: '/settings',   icon: Settings },
]

export default function Sidebar({ collapsed, onToggle, user, onLogout }) {
  const location = useLocation()
  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 h-screen bg-sidebar flex flex-col transition-all duration-300 z-40',
        collapsed ? 'w-[70px]' : 'w-[240px]',
      )}
    >
      {/* Logo */}
      <div className={clsx(
        'flex items-center h-16 border-b border-white/10 flex-shrink-0 px-4',
        collapsed && 'justify-center px-0',
      )}>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-semibold text-[15px] leading-tight tracking-tight">Medicare ERP</p>
            <p className="text-slate-500 text-[11px] font-medium">Medical Inventory</p>
          </div>
        )}
        {collapsed && (
          <p className="text-white font-bold text-[13px] tracking-tight">M</p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-5 space-y-0.5 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-3 mb-3">Navigation</p>
        )}
        {navItems.map(({ label, to, icon: Icon }) => {
          const isActive = location.pathname === to
          return (
            <NavLink
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              className={clsx(
                'sidebar-link',
                isActive ? 'sidebar-link-active' : 'sidebar-link-inactive',
                collapsed && 'justify-center px-0',
              )}
            >
              <Icon size={19} strokeWidth={isActive ? 2.5 : 1.8} className="flex-shrink-0" />
              {!collapsed && <span className="truncate text-[14px]">{label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* Divider */}
      <div className="mx-3 border-t border-white/8" />

      {/* User info */}
      {!collapsed && (
        <div className="px-3 py-3">
          <p className="text-white text-[13px] font-semibold truncate leading-tight">{user?.name}</p>
          <p className="text-slate-500 text-[11px] truncate">{user?.role}</p>
        </div>
      )}

      {/* Sign Out — always visible */}
      <div className="px-2 pb-4">
        <button
          onClick={onLogout}
          title={collapsed ? 'Sign Out' : undefined}
          className={clsx(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200',
            'text-slate-400 hover:text-white hover:bg-red-500/20',
            collapsed && 'justify-center px-0',
          )}
        >
          <LogOut size={18} strokeWidth={1.8} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-white border border-border shadow-md flex items-center justify-center text-txt-secondary hover:text-primary transition-colors z-50"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}
