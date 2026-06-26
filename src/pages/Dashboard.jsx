import { useState, useEffect } from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import {
  Package, TrendingUp, ShoppingCart, DollarSign,
  AlertTriangle, AlertOctagon, ArrowUpRight, ArrowDownRight,
  Activity, Clock, CheckCircle, XCircle, Truck, Zap,
  FileText, RefreshCcw, BarChart2,
} from 'lucide-react'
import {
  kpiData, revenueData, stockByCategory, salesByCategory,
  recentActivity, products, sales,
} from '../data/mockData'
import { useAuth } from '../context/AuthContext'

const PIE_COLORS = ['#2563EB', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#0F766E']

/* ─── Animated number counter ─── */
function Counter({ end, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let cur = 0
    const step = end / 50
    const t = setInterval(() => {
      cur += step
      if (cur >= end) { setVal(end); clearInterval(t) } else setVal(Math.floor(cur))
    }, 18)
    return () => clearInterval(t)
  }, [end])
  return <>{prefix}{val.toLocaleString('en-IN')}{suffix}</>
}

/* ─── Recharts tooltip ─── */
function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-border rounded-xl shadow-dropdown px-3 py-2.5 text-[12px]">
      <p className="font-semibold text-txt-primary mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="flex items-center gap-1.5 mb-0.5">
          <span className="font-medium">{p.name}:</span>
          <span>₹{p.value?.toLocaleString('en-IN')}</span>
        </p>
      ))}
    </div>
  )
}

const activityIcon = {
  sale: <CheckCircle size={15} className="text-green-500 flex-shrink-0" />,
  stock: <AlertTriangle size={15} className="text-amber-500 flex-shrink-0" />,
  purchase: <Package size={15} className="text-primary flex-shrink-0" />,
  expiry: <XCircle size={15} className="text-danger flex-shrink-0" />,
}

const lowStockProducts = products.filter(p => p.status === 'Low Stock')
const expiredProducts = products.filter(p => p.status === 'Expired')
const recentSix = revenueData.slice(-6)
const maxRev = Math.max(...recentSix.map(m => m.revenue))

/* ════════════════════════════
   ADMIN DASHBOARD
════════════════════════════ */
function AdminDashboard() {
  return (
    <div className="space-y-5 animate-fadeIn">

      {/* ── Hero KPI row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Revenue card — with mini bar chart */}
        <div className="group bg-white rounded-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/5 -translate-y-12 translate-x-12 pointer-events-none" />
          <div className="flex items-start justify-between mb-1">
            <p className="text-[11px] font-semibold text-txt-muted uppercase tracking-widest">Monthly Revenue</p>
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <DollarSign size={17} className="text-primary" strokeWidth={2} />
            </div>
          </div>
          <p className="text-[34px] font-bold text-txt-primary leading-none mt-2">
            <Counter end={528000} prefix="₹" />
          </p>
          <div className="flex items-center gap-2 mt-2 mb-5">
            <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-success bg-green-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={11} />+7.4%
            </span>
            <span className="text-[12px] text-txt-muted">vs last month</span>
          </div>
          {/* Mini bars */}
          <div className="flex items-end gap-1.5 h-10">
            {recentSix.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t transition-all duration-500 ${i === recentSix.length - 1 ? 'bg-primary' : 'bg-primary/20 group-hover:bg-primary/35'}`}
                  style={{ height: `${Math.round((m.revenue / maxRev) * 100)}%`, minHeight: 4 }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-txt-muted">{recentSix[0].month}</span>
            <span className="text-[10px] font-semibold text-primary">{recentSix[5].month}</span>
          </div>
        </div>

        {/* Today's Sales */}
        <div className="group bg-white rounded-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-6 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-purple-500/5 translate-y-10 -translate-x-10 pointer-events-none" />
          <div className="flex items-start justify-between mb-1">
            <p className="text-[11px] font-semibold text-txt-muted uppercase tracking-widest">Today's Sales</p>
            <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <ShoppingCart size={17} className="text-purple-600" strokeWidth={2} />
            </div>
          </div>
          <p className="text-[34px] font-bold text-txt-primary leading-none mt-2">
            <Counter end={18152} prefix="₹" />
          </p>
          <p className="text-[13px] text-txt-muted mt-2">{kpiData.todaySales.count} invoices raised today</p>
          <div className="mt-5 space-y-2">
            {[['Cash', '₹2,194', 12], ['UPI', '₹5,760', 32], ['Bank Transfer', '₹10,198', 56]].map(([method, amt, pct]) => (
              <div key={method} className="flex items-center gap-3">
                <span className="text-[11px] text-txt-muted w-20 flex-shrink-0">{method}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[11px] font-semibold text-txt-primary w-14 text-right">{amt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock health */}
        <div className="group bg-white rounded-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-green/5 -translate-y-8 translate-x-8 pointer-events-none" />
          <div className="flex items-start justify-between mb-1">
            <p className="text-[11px] font-semibold text-txt-muted uppercase tracking-widest">Inventory Health</p>
            <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={17} className="text-green-600" strokeWidth={2} />
            </div>
          </div>
          <p className="text-[34px] font-bold text-txt-primary leading-none mt-2">
            <Counter end={8450} suffix=" units" />
          </p>
          <p className="text-[13px] text-txt-muted mt-2">Total stock across all categories</p>
          <div className="mt-5 space-y-2.5">
            {[
              { label: 'In Stock', count: 14, total: 20, color: '#10B981' },
              { label: 'Low Stock', count: 4, total: 20, color: '#F59E0B' },
              { label: 'Out / Exp', count: 2, total: 20, color: '#EF4444' },
            ].map(({ label, count, total, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-[11px] text-txt-muted w-16 flex-shrink-0">{label}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(count / total) * 100}%`, backgroundColor: color }} />
                </div>
                <span className="text-[11px] font-semibold text-txt-primary w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Secondary KPI strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: 20, sub: '8 categories', icon: Package, iconBg: 'bg-blue-50', iconColor: 'text-primary', up: true, delta: '+2 this month' },
          { label: 'Active Suppliers', value: 5, sub: 'of 6 registered', icon: Truck, iconBg: 'bg-teal/10', iconColor: 'text-teal', up: true, delta: 'All delivering' },
          { label: 'Low Stock Alert', value: 4, sub: 'Need reorder now', icon: AlertTriangle, iconBg: 'bg-amber-50', iconColor: 'text-amber-500', up: false, delta: '↑ 1 since yesterday' },
          { label: 'Expired Items', value: 2, sub: 'Require disposal', icon: AlertOctagon, iconBg: 'bg-red-50', iconColor: 'text-danger', up: false, delta: 'Immediate action' },
        ].map(({ label, value, sub, icon: Icon, iconBg, iconColor, up, delta }) => (
          <div key={label} className="group bg-white rounded-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 p-4 flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <Icon size={18} className={iconColor} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-txt-muted leading-tight truncate">{label}</p>
              <p className="text-[24px] font-bold text-txt-primary leading-none mt-0.5">{value}</p>
              <p className="text-[11px] text-txt-muted mt-0.5 truncate">{sub}</p>
              <p className={`text-[10px] font-semibold flex items-center gap-0.5 mt-1 ${up ? 'text-success' : 'text-danger'}`}>
                {up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}{delta}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-white rounded-card border border-border shadow-card p-6 hover:shadow-card-hover transition-all duration-300">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-[17px] font-semibold text-txt-primary">Revenue Overview</h2>
              <p className="text-[12px] text-txt-muted mt-0.5">Monthly revenue vs profit — FY 2024</p>
            </div>
            <span className="badge badge-success text-[11px]">↑ 7.4% this month</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gPro" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'Poppins' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} width={52} />
              <Tooltip content={<ChartTip />} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12, fontFamily: 'Poppins' }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2563EB" strokeWidth={2.5} fill="url(#gRev)" dot={false} activeDot={{ r: 4 }} />
              <Area type="monotone" dataKey="profit" name="Profit" stroke="#10B981" strokeWidth={2.5} fill="url(#gPro)" dot={false} activeDot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by category */}
        <div className="bg-white rounded-card border border-border shadow-card p-6 hover:shadow-card-hover transition-all duration-300 flex flex-col">
          <div className="mb-4">
            <h2 className="text-[17px] font-semibold text-txt-primary">Sales Mix</h2>
            <p className="text-[12px] text-txt-muted mt-0.5">By medicine category · Dec 2024</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={salesByCategory} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={4} dataKey="value">
                {salesByCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={v => [`${v}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-auto grid grid-cols-2 gap-x-4 gap-y-1.5">
            {salesByCategory.map((item, i) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="text-[11px] text-txt-secondary truncate">{item.name}</span>
                <span className="text-[11px] font-semibold text-txt-primary ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stock chart + Activity ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-white rounded-card border border-border shadow-card p-6 hover:shadow-card-hover transition-all duration-300">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-[17px] font-semibold text-txt-primary">Stock by Category</h2>
              <p className="text-[12px] text-txt-muted mt-0.5">Current unit count across categories</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stockByCategory} barSize={26} margin={{ top: 0, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={v => [v, 'Units']} />
              <Bar dataKey="stock" radius={[6, 6, 0, 0]}>
                {stockByCategory.map((_, i) => <Cell key={i} fill={i % 2 === 0 ? '#2563EB' : '#0F766E'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-card border border-border shadow-card p-6 hover:shadow-card-hover transition-all duration-300 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-semibold text-txt-primary">Recent Activity</h2>
            <Activity size={16} className="text-txt-muted" />
          </div>
          <div className="flex-1 space-y-0.5 overflow-y-auto">
            {recentActivity.map(a => (
              <div key={a.id} className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-default">
                <div className="mt-0.5">{activityIcon[a.type]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-txt-primary leading-snug">{a.message}</p>
                  {a.amount && <p className="text-[11px] font-semibold text-primary mt-0.5">₹{a.amount.toLocaleString('en-IN')}</p>}
                  <p className="text-[10px] text-txt-muted flex items-center gap-1 mt-0.5"><Clock size={9} /> {a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Alerts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Low Stock */}
        <div className="bg-white rounded-card border border-amber-200/80 shadow-card p-5 hover:shadow-card-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                <AlertTriangle size={15} className="text-amber-500" />
              </div>
              <div>
                <p className="text-[15px] font-semibold text-txt-primary">Low Stock Alert</p>
                <p className="text-[11px] text-txt-muted">{lowStockProducts.length} items below minimum threshold</p>
              </div>
            </div>
            <span className="badge badge-warning text-[11px]">{lowStockProducts.length} items</span>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map(p => {
              const pct = Math.round((p.stock / p.minStock) * 100)
              return (
                <div key={p.id}>
                  <div className="flex justify-between mb-1">
                    <p className="text-[13px] font-medium text-txt-primary">{p.name}</p>
                    <p className="text-[12px] text-danger font-semibold">{p.stock}/{p.minStock} units</p>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: pct < 50 ? '#EF4444' : '#F59E0B' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Expired */}
        <div className="bg-white rounded-card border border-red-200/80 shadow-card p-5 hover:shadow-card-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertOctagon size={15} className="text-danger" />
              </div>
              <div>
                <p className="text-[15px] font-semibold text-txt-primary">Expired Medicines</p>
                <p className="text-[11px] text-txt-muted">Requires immediate disposal</p>
              </div>
            </div>
            <span className="badge badge-danger text-[11px]">{expiredProducts.length} items</span>
          </div>
          <div className="space-y-3">
            {expiredProducts.map(p => (
              <div key={p.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                <div className="w-8 h-8 rounded-lg bg-danger flex items-center justify-center flex-shrink-0">
                  <XCircle size={14} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-txt-primary">{p.name}</p>
                  <p className="text-[10px] text-txt-muted">Batch: {p.batch} · Expired: {p.expiry}</p>
                </div>
                <button className="btn btn-danger btn-sm text-[12px] px-3 py-1.5">Dispose</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════
   USER DASHBOARD (non-admin)
════════════════════════════ */
function UserDashboard({ user }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = user?.name?.split(' ')[0] || 'there'

  const pendingSales = sales.filter(s => s.status === 'Pending').length
  const todaySales = sales.filter(s => s.date === '2024-12-10')
  const todayRevenue = todaySales.reduce((a, b) => a + b.total, 0)

  const priorities = [
    { done: false, label: `Process ${pendingSales} pending invoices`, urgency: 'high' },
    { done: false, label: `Check ${lowStockProducts.length} low stock items`, urgency: 'medium' },
    { done: true, label: 'Verify incoming PO-2024-002 from MedPharm', urgency: 'low' },
    { done: false, label: `Mark ${expiredProducts.length} expired medicines for disposal`, urgency: 'high' },
  ]

  const quickActions = [
    { label: 'New Sale', icon: ShoppingCart, to: '/sales', color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Check Stock', icon: Package, to: '/inventory', color: '#10B981', bg: '#ECFDF5' },
    { label: 'Suppliers', icon: Truck, to: '/suppliers', color: '#0F766E', bg: '#F0FDFA' },
    { label: 'Reports', icon: BarChart2, to: '/reports', color: '#8B5CF6', bg: '#F5F3FF' },
  ]

  return (
    <div className="space-y-5 animate-fadeIn">

      {/* Greeting banner */}
      <div className="bg-gradient-to-r from-sidebar to-slate-700 rounded-card p-6 flex items-center justify-between relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 rounded-full bg-primary/10 translate-x-16 -translate-y-16" />
        <div className="relative z-10">
          <p className="text-slate-400 text-[13px] font-medium">{greeting},</p>
          <h2 className="text-white text-[26px] font-bold tracking-tight leading-tight">{firstName} 👋</h2>
          <p className="text-slate-400 text-[13px] mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            {' · '}Here's what needs your attention today.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3 relative z-10">
          <div className="text-right">
            <p className="text-slate-400 text-[11px] uppercase tracking-widest">Today's work</p>
            <p className="text-white text-[28px] font-bold leading-none">₹{todayRevenue.toLocaleString('en-IN')}</p>
            <p className="text-slate-400 text-[12px]">{todaySales.length} invoices processed</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Today's Sales", value: todaySales.length, sub: `₹${todayRevenue.toLocaleString('en-IN')} total`, icon: ShoppingCart, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
          { label: 'Pending Invoices', value: pendingSales, sub: 'Awaiting payment', icon: FileText, iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
          { label: 'Stock Alerts', value: lowStockProducts.length, sub: 'Items below minimum', icon: AlertTriangle, iconBg: 'bg-red-100', iconColor: 'text-danger' },
          { label: 'Total Products', value: products.length, sub: 'In catalogue', icon: Package, iconBg: 'bg-blue-100', iconColor: 'text-primary' },
        ].map(({ label, value, sub, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="group bg-white rounded-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-4 flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon size={18} className={iconColor} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-txt-muted font-medium leading-tight">{label}</p>
              <p className="text-[24px] font-bold text-txt-primary leading-none mt-0.5">{value}</p>
              <p className="text-[11px] text-txt-muted mt-0.5 truncate">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Today's priorities */}
        <div className="lg:col-span-2 bg-white rounded-card border border-border shadow-card p-6 hover:shadow-card-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[17px] font-semibold text-txt-primary">Today's Priorities</h2>
              <p className="text-[12px] text-txt-muted mt-0.5">Tasks that need your attention</p>
            </div>
            <span className="badge badge-warning text-[11px]">{priorities.filter(p => !p.done).length} pending</span>
          </div>
          <div className="space-y-2.5">
            {priorities.map((p, i) => (
              <div key={i} className={[
                'flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-200',
                p.done ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-border hover:border-primary/30 hover:bg-primary/[0.02]',
              ].join(' ')}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${p.done ? 'bg-success border-success' : 'border-slate-300'}`}>
                  {p.done && <CheckCircle size={12} className="text-white" />}
                </div>
                <div className="flex-1">
                  <p className={`text-[13px] font-medium ${p.done ? 'line-through text-txt-muted' : 'text-txt-primary'}`}>{p.label}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.urgency === 'high' ? 'bg-red-100 text-danger' :
                    p.urgency === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-txt-muted'
                  }`}>
                  {p.urgency}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-card border border-border shadow-card p-6 hover:shadow-card-hover transition-all duration-300">
          <h2 className="text-[17px] font-semibold text-txt-primary mb-1">Quick Actions</h2>
          <p className="text-[12px] text-txt-muted mb-5">Jump to common tasks</p>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ label, icon: Icon, color, bg }) => (
              <button key={label} className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-border hover:border-current hover:shadow-md transition-all duration-250 group" style={{ '--tw-border-opacity': 1 }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110" style={{ backgroundColor: bg }}>
                  <Icon size={20} style={{ color }} strokeWidth={2} />
                </div>
                <span className="text-[12px] font-semibold text-txt-secondary group-hover:text-txt-primary transition-colors text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent sales + Low stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent sales */}
        <div className="bg-white rounded-card border border-border shadow-card p-6 hover:shadow-card-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-semibold text-txt-primary">Recent Sales</h2>
            <span className="text-[12px] text-primary font-medium hover:underline cursor-pointer">View all →</span>
          </div>
          <div className="space-y-0.5">
            {sales.slice(0, 5).map(s => (
              <div key={s.id} className="flex items-center justify-between py-2.5 px-2 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ShoppingCart size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-txt-primary">{s.customer}</p>
                    <p className="text-[11px] text-txt-muted">{s.id} · {s.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-txt-primary">₹{s.total.toLocaleString('en-IN')}</p>
                  <span className={`text-[10px] font-semibold ${s.status === 'Paid' ? 'text-success' : s.status === 'Pending' ? 'text-amber-500' : 'text-danger'}`}>
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock list */}
        <div className="bg-white rounded-card border border-amber-200/60 shadow-card p-6 hover:shadow-card-hover transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              <h2 className="text-[17px] font-semibold text-txt-primary">Needs Reorder</h2>
            </div>
            <span className="badge badge-warning text-[11px]">{lowStockProducts.length} items</span>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map(p => {
              const pct = Math.round((p.stock / p.minStock) * 100)
              return (
                <div key={p.id} className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 hover:border-amber-200 transition-colors">
                  <div className="flex justify-between mb-1.5">
                    <p className="text-[13px] font-semibold text-txt-primary">{p.name}</p>
                    <p className="text-[12px] text-danger font-semibold">{p.stock}/{p.minStock}</p>
                  </div>
                  <div className="h-1.5 bg-amber-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: pct < 50 ? '#EF4444' : '#F59E0B' }} />
                  </div>
                  <p className="text-[10px] text-txt-muted mt-1">{p.manufacturer} · {p.category}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Root ── */
export default function Dashboard() {
  const user = useAuth()
  const isAdmin = user?.role === 'Administrator'
  return isAdmin ? <AdminDashboard /> : <UserDashboard user={user} />
}
