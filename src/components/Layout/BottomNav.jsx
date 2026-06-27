import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Package, ShoppingCart, Wallet, Menu,
} from 'lucide-react'

const bottomItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/inventory', icon: Package,         label: 'Inventory' },
  { to: '/sales',     icon: ShoppingCart,    label: 'Sales' },
  { to: '/accounts',  icon: Wallet,          label: 'Accounts' },
]

export default function BottomNav({ onMenuOpen }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around h-14">
        {bottomItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors ${isActive ? 'text-primary' : 'text-txt-muted'}`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="text-[10px] font-semibold">{label}</span>
              </>
            )}
          </NavLink>
        ))}
        <button
          onClick={onMenuOpen}
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl text-txt-muted transition-colors hover:text-primary"
        >
          <Menu size={20} strokeWidth={1.8} />
          <span className="text-[10px] font-semibold">More</span>
        </button>
      </div>
    </nav>
  )
}
