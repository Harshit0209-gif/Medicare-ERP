import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Package, ShoppingCart, Truck,
  BarChart2, Settings, ChevronLeft, ChevronRight, LogOut, Wallet, X,
} from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Inventory',  to: '/inventory',  icon: Package },
  { label: 'Sales',      to: '/sales',      icon: ShoppingCart },
  { label: 'Suppliers',  to: '/suppliers',  icon: Truck },
  { label: 'Accounts',   to: '/accounts',   icon: Wallet },
  { label: 'Reports',    to: '/reports',    icon: BarChart2 },
  { label: 'Settings',   to: '/settings',   icon: Settings },
]

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose, user, onLogout }) {
  const location = useLocation()

  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 h-screen bg-sidebar flex flex-col z-50',
        'transition-transform lg:transition-all duration-300',
        // Width: 280px on mobile, 240px/70px on desktop
        collapsed ? 'lg:w-[70px]' : 'lg:w-[240px]',
        'w-[280px]',
        // Show/hide: hidden by default on mobile, always visible on desktop
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}
    >
      {/* Logo + mobile close */}
      <div className={clsx(
        'flex items-center h-16 border-b border-white/10 flex-shrink-0 px-4 gap-3',
        collapsed && 'lg:justify-center lg:px-0',
      )}>
        {/* Text logo — hidden when collapsed on desktop */}
        <div className={clsx('overflow-hidden flex-1', collapsed && 'lg:hidden')}>
          <p className="text-white font-semibold text-[15px] leading-tight tracking-tight">GOBT ERP</p>
          <p className="text-slate-500 text-[11px] font-medium">Medical Inventory</p>
        </div>
        {/* Collapsed icon — desktop only */}
        {collapsed && (
          <p className="text-white font-bold text-[13px] tracking-tight hidden lg:block">G</p>
        )}
        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="lg:hidden ml-auto p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-5 space-y-0.5 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-3 mb-3 hidden lg:block">Navigation</p>
        )}
        {navItems.map(({ label, to, icon: Icon }) => {
          const isActive = location.pathname === to
          return (
            <NavLink
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              onClick={onMobileClose}
              className={clsx(
                'sidebar-link',
                isActive ? 'sidebar-link-active' : 'sidebar-link-inactive',
                collapsed && 'lg:justify-center lg:px-0',
              )}
            >
              <Icon size={19} strokeWidth={isActive ? 2.5 : 1.8} className="flex-shrink-0" />
              <span className={clsx('truncate text-[14px]', collapsed && 'lg:hidden')}>{label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Divider */}
      <div className="mx-3 border-t border-white/8" />

      {/* User info */}
      <div className={clsx('px-3 py-3', collapsed && 'lg:hidden')}>
        <p className="text-white text-[13px] font-semibold truncate leading-tight">{user?.name}</p>
        <p className="text-slate-500 text-[11px] truncate">{user?.role}</p>
      </div>

      {/* Sign Out */}
      <div className="px-2 pb-4">
        <button
          onClick={() => { onLogout(); onMobileClose() }}
          title={collapsed ? 'Sign Out' : undefined}
          className={clsx(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200',
            'text-slate-400 hover:text-white hover:bg-red-500/20',
            collapsed && 'lg:justify-center lg:px-0',
          )}
        >
          <LogOut size={18} strokeWidth={1.8} className="flex-shrink-0" />
          <span className={clsx(collapsed && 'lg:hidden')}>Sign Out</span>
        </button>
      </div>

      {/* Collapse toggle — desktop only */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-white border border-border shadow-md items-center justify-center text-txt-secondary hover:text-primary transition-colors z-50 hidden lg:flex"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}
