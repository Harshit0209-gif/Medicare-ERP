import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'
import { Download, TrendingUp, TrendingDown, Calendar } from 'lucide-react'
import { revenueData, stockByCategory, salesByCategory, products, gstB2BData, misSalesData } from '../data/mockData'

const PIE_COLORS = ['#2563EB', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#0F766E']
const TABS = ['Revenue', 'Inventory', 'Sales', 'Expiry', 'GST Report', 'Sales MIS']

function downloadCSV(headers, keys, rows, filename) {
  const lines = [headers.join(','), ...rows.map(r => keys.map(k => `"${r[k] ?? ''}"`).join(','))]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const expiryRisk = [
  { range: 'Expired', count: 2, color: '#EF4444' },
  { range: '< 3 months', count: 3, color: '#F97316' },
  { range: '3–6 months', count: 5, color: '#F59E0B' },
  { range: '6–12 months', count: 8, color: '#10B981' },
  { range: '> 12 months', count: 12, color: '#2563EB' },
]

const monthlySalesCount = [
  { month: 'Jan', invoices: 82, customers: 34 },
  { month: 'Feb', invoices: 91, customers: 38 },
  { month: 'Mar', invoices: 88, customers: 36 },
  { month: 'Apr', invoices: 104, customers: 44 },
  { month: 'May', invoices: 98, customers: 41 },
  { month: 'Jun', invoices: 112, customers: 47 },
  { month: 'Jul', invoices: 118, customers: 51 },
  { month: 'Aug', invoices: 115, customers: 49 },
  { month: 'Sep', invoices: 128, customers: 55 },
  { month: 'Oct', invoices: 134, customers: 58 },
  { month: 'Nov', invoices: 142, customers: 62 },
  { month: 'Dec', invoices: 156, customers: 68 },
]

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border rounded-drop shadow-dropdown px-3 py-2 text-[13px]">
        <p className="font-semibold text-txt-primary mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' && p.value > 1000
              ? `₹${p.value.toLocaleString('en-IN')}`
              : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function StatCard({ label, value, sub, trend, trendUp, color }) {
  return (
    <div className="card p-5 flex items-center gap-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex-1">
        <p className="text-[12px] font-medium text-txt-muted uppercase tracking-wide">{label}</p>
        <p className="text-[24px] font-bold mt-1" style={{ color: color || '#0F172A' }}>{value}</p>
        {sub && <p className="text-[12px] text-txt-muted mt-0.5">{sub}</p>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-[13px] font-semibold ${trendUp ? 'text-success' : 'text-danger'}`}>
          {trendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {trend}
        </div>
      )}
    </div>
  )
}

export default function Reports() {
  const [tab, setTab] = useState('Revenue')
  const [period, setPeriod] = useState('This Year')

  const totalRevenue = revenueData.reduce((s, x) => s + x.revenue, 0)
  const totalProfit = revenueData.reduce((s, x) => s + x.profit, 0)
  const avgMonthly = Math.round(totalRevenue / revenueData.length)
  const bestMonth = revenueData.reduce((a, b) => a.revenue > b.revenue ? a : b)

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="text-[13px] text-txt-muted mt-0.5">Business intelligence and performance insights</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-btn text-[13px] text-txt-secondary">
            <Calendar size={15} />
            <select className="outline-none bg-transparent font-medium text-txt-primary" value={period} onChange={e => setPeriod(e.target.value)}>
              {['This Month', 'Last Month', 'This Quarter', 'This Year'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <button className="btn-primary btn-sm"><Download size={15} />Export Report</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto bg-white border border-border rounded-card p-1 w-full shadow-card">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-btn text-[14px] font-medium transition-all duration-200 ${tab === t ? 'bg-primary text-white shadow-sm' : 'text-txt-secondary hover:text-txt-primary'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} sub="FY 2024" trend="+14.2%" trendUp />
            <StatCard label="Net Profit" value={`₹${(totalProfit / 100000).toFixed(1)}L`} sub="~32% margin" trend="+11.8%" trendUp color="#10B981" />
            <StatCard label="Avg Monthly" value={`₹${(avgMonthly / 1000).toFixed(0)}k`} sub="Per month" trend="+7.4%" trendUp />
            <StatCard label="Best Month" value={bestMonth.month} sub={`₹${(bestMonth.revenue / 1000).toFixed(0)}k`} />
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-title">Revenue vs Profit Trend</h2>
                <p className="text-[13px] text-txt-muted">Monthly comparison for FY 2024</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2563EB" strokeWidth={2.5} fill="url(#rev)" dot={false} />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={2} fill="url(#exp)" dot={false} />
                <Area type="monotone" dataKey="profit" name="Profit" stroke="#10B981" strokeWidth={2.5} fill="url(#pro)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === 'Inventory' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Products" value="20" sub="Across 8 categories" />
            <StatCard label="Total Stock Value" value="₹4.02L" sub="At selling price" trend="+5.2%" trendUp color="#10B981" />
            <StatCard label="Low Stock Items" value="4" sub="Need reorder" trend="↑ 1 new" trendUp={false} color="#F97316" />
            <StatCard label="Out of Stock" value="2" sub="Expired / depleted" color="#EF4444" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h2 className="section-title mb-1">Stock by Category</h2>
              <p className="text-[13px] text-txt-muted mb-6">Current unit count per category</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={stockByCategory} barSize={30}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} angle={-25} textAnchor="end" height={45} />
                  <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => [v, 'Units']} />
                  <Bar dataKey="stock" radius={[6, 6, 0, 0]}>
                    {stockByCategory.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h2 className="section-title mb-1">Stock Value Distribution</h2>
              <p className="text-[13px] text-txt-muted mb-6">₹ value per category</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={stockByCategory} cx="50%" cy="50%" outerRadius={85} paddingAngle={3} dataKey="value">
                    {stockByCategory.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={v => [`₹${v.toLocaleString('en-IN')}`, 'Value']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
                {stockByCategory.map((item, i) => (
                  <div key={item.category} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="text-[11px] text-txt-secondary truncate">{item.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'Sales' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Invoices" value="156" sub="This year" trend="+22%" trendUp />
            <StatCard label="Total Customers" value="68" sub="Unique buyers" trend="+18%" trendUp color="#8B5CF6" />
            <StatCard label="Avg Invoice Value" value="₹8,420" sub="Per transaction" trend="+4.8%" trendUp />
            <StatCard label="Collection Rate" value="87%" sub="Invoices paid" trend="+2%" trendUp color="#10B981" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card p-6 lg:col-span-2">
              <h2 className="section-title mb-1">Monthly Sales Volume</h2>
              <p className="text-[13px] text-txt-muted mb-6">Invoices raised and unique customers per month</p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={monthlySalesCount}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="invoices" name="Invoices" stroke="#2563EB" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="customers" name="Customers" stroke="#8B5CF6" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h2 className="section-title mb-1">Sales Mix</h2>
              <p className="text-[13px] text-txt-muted mb-6">By medicine category</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={salesByCategory} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                    {salesByCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={v => [`${v}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-1.5">
                {salesByCategory.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="text-[12px] text-txt-secondary flex-1">{item.name}</span>
                    <span className="text-[12px] font-semibold text-txt-primary">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'Expiry' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {expiryRisk.map(e => (
              <div key={e.range} className="card p-4 text-center hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-[18px]" style={{ backgroundColor: e.color }}>
                  {e.count}
                </div>
                <p className="text-[12px] font-medium text-txt-secondary">{e.range}</p>
              </div>
            ))}
          </div>

          <div className="card p-6">
            <h2 className="section-title mb-1">Expiry Risk Distribution</h2>
            <p className="text-[13px] text-txt-muted mb-6">Products grouped by time-to-expiry</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={expiryRisk} barSize={52}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={v => [v, 'Products']} />
                <Bar dataKey="count" name="Products" radius={[8, 8, 0, 0]}>
                  {expiryRisk.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Batch-wise expiry alert table */}
          <div className="card overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="section-title">Batch-wise Expiry Alert</h2>
                <p className="text-[12px] text-txt-muted mt-0.5">All products sorted by nearest expiry date</p>
              </div>
              <button onClick={() => downloadCSV(['Name', 'Category', 'Batch', 'Manufacturer', 'Expiry', 'Stock', 'Risk'], ['name', 'category', 'batch', 'manufacturer', 'expiry', 'stock', 'risk'], products.filter(p => p.status === 'Expired' || new Date(p.expiry) < new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)).map(p => { const d = Math.ceil((new Date(p.expiry) - Date.now()) / 86400000); return { ...p, risk: d < 0 ? 'Expired' : d < 90 ? 'Critical' : d < 180 ? 'High' : 'Moderate' } }), 'expiry_batch_alert')} className="btn-outline btn-sm"><Download size={14} />Export</button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Category</th>
                    <th>Batch No.</th>
                    <th>Manufacturer</th>
                    <th>Expiry Date</th>
                    <th>Days Left</th>
                    <th>Stock (units)</th>
                    <th>Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  {products
                    .filter(p => p.status === 'Expired' || new Date(p.expiry) < new Date(Date.now() + 180 * 24 * 60 * 60 * 1000))
                    .sort((a, b) => new Date(a.expiry) - new Date(b.expiry))
                    .map((p, i) => {
                      const daysLeft = Math.ceil((new Date(p.expiry) - Date.now()) / (1000 * 60 * 60 * 24))
                      const risk = daysLeft < 0 ? 'Expired' : daysLeft < 90 ? 'Critical' : daysLeft < 180 ? 'High' : 'Moderate'
                      const riskBadge = { Expired: 'badge-danger', Critical: 'badge-danger', High: 'badge-warning', Moderate: 'badge-info' }
                      return (
                        <tr key={p.id} className="animate-fadeIn" style={{ animationDelay: `${i * 30}ms` }}>
                          <td className="font-medium text-txt-primary">{p.name}</td>
                          <td><span className="badge badge-gray text-[11px]">{p.category}</span></td>
                          <td className="font-mono text-[12px] text-txt-secondary">{p.batch}</td>
                          <td className="text-[12px] text-txt-secondary">{p.manufacturer}</td>
                          <td className="text-[13px] text-txt-secondary">{p.expiry}</td>
                          <td className={`text-[13px] font-semibold ${daysLeft < 0 ? 'text-danger' : daysLeft < 90 ? 'text-orange-600' : 'text-amber-600'}`}>
                            {daysLeft < 0 ? `${Math.abs(daysLeft)}d ago` : `${daysLeft}d`}
                          </td>
                          <td className="text-txt-secondary">{p.stock}</td>
                          <td><span className={`badge ${riskBadge[risk]} text-[11px]`}>{risk}</span></td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'GST Report' && (
        <div className="space-y-5">
          {/* Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Taxable Value', value: '₹4,85,000', color: 'text-txt-primary' },
              { label: 'CGST Collected',      value: '₹9,450',    color: 'text-primary' },
              { label: 'SGST Collected',      value: '₹9,450',    color: 'text-primary' },
              { label: 'IGST Collected',      value: '₹3,212',    color: 'text-purple-600' },
            ].map(c => (
              <div key={c.label} className="bg-white border border-border rounded-xl p-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
                <p className="text-[11px] text-txt-muted uppercase tracking-wide font-medium">{c.label}</p>
                <p className={`text-[22px] font-bold mt-0.5 ${c.color}`}>{c.value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-btn text-[13px] text-txt-secondary">
              <Calendar size={15} />
              <select className="outline-none bg-transparent font-medium text-txt-primary">
                <option>Dec 2024 (Current)</option>
                <option>Nov 2024</option>
                <option>Oct 2024</option>
              </select>
            </div>
            <div className="flex gap-1 bg-white border border-border rounded-xl p-1 shadow-card">
              {['GSTR-1 (Outward)', 'GSTR-2 (Inward)', 'GSTR-3B Summary'].map(t => (
                <button key={t} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium ${t === 'GSTR-1 (Outward)' ? 'bg-primary text-white' : 'text-txt-secondary hover:text-txt-primary'}`}>{t}</button>
              ))}
            </div>
            <button onClick={() => downloadCSV(['GSTIN', 'Party', 'Invoices', 'Taxable', 'CGST', 'SGST', 'IGST', 'Total'], ['gstin', 'party', 'invoices', 'taxable', 'cgst', 'sgst', 'igst', 'total'], gstB2BData, 'gstr1_b2b_dec2024')} className="ml-auto btn-primary btn-sm"><Download size={14} />Download GSTR-1</button>
          </div>

          {/* B2B section */}
          <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-slate-50 flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-txt-primary">4A — B2B Invoices (Taxable Outward Supplies)</p>
                <p className="text-[11px] text-txt-muted mt-0.5">Supplies made to registered taxpayers</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-border">
                    {['GSTIN of Recipient', 'Trade / Legal Name', 'No. of Invoices', 'Taxable Value (₹)', 'CGST (₹)', 'SGST (₹)', 'IGST (₹)', 'Invoice Value (₹)'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gstB2BData.map((row, i) => (
                    <tr key={row.gstin} className={`border-b border-border hover:bg-blue-50/20 ${i % 2 === 1 ? 'bg-slate-50/30' : ''}`}>
                      <td className="px-4 py-3 font-mono text-[12px] text-primary">{row.gstin}</td>
                      <td className="px-4 py-3 font-medium text-txt-primary">{row.party}</td>
                      <td className="px-4 py-3 text-txt-secondary">{row.invoices}</td>
                      <td className="px-4 py-3 font-semibold text-txt-primary">₹{row.taxable.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-txt-secondary">{row.cgst > 0 ? `₹${row.cgst}` : '—'}</td>
                      <td className="px-4 py-3 text-txt-secondary">{row.sgst > 0 ? `₹${row.sgst}` : '—'}</td>
                      <td className="px-4 py-3 text-txt-secondary">{row.igst > 0 ? `₹${row.igst}` : '—'}</td>
                      <td className="px-4 py-3 font-bold text-txt-primary">₹{row.total.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-800 text-white">
                    <td colSpan={3} className="px-4 py-3 font-bold text-[13px]">Total</td>
                    <td className="px-4 py-3 font-bold">₹{gstB2BData.reduce((s, r) => s + r.taxable, 0).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 font-bold">₹{gstB2BData.reduce((s, r) => s + r.cgst, 0).toFixed(1)}</td>
                    <td className="px-4 py-3 font-bold">₹{gstB2BData.reduce((s, r) => s + r.sgst, 0).toFixed(1)}</td>
                    <td className="px-4 py-3 font-bold">₹{gstB2BData.reduce((s, r) => s + r.igst, 0).toFixed(1)}</td>
                    <td className="px-4 py-3 font-bold">₹{gstB2BData.reduce((s, r) => s + r.total, 0).toLocaleString('en-IN')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* ITC summary */}
          <div className="bg-white rounded-xl border border-border shadow-card p-5">
            <h3 className="text-[14px] font-semibold text-txt-primary mb-4">Input Tax Credit (ITC) Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'ITC on Purchases (CGST)', value: '₹9,250' },
                { label: 'ITC on Purchases (SGST)', value: '₹9,250' },
                { label: 'Net GST Payable (CGST)',  value: '₹200' },
                { label: 'Net GST Payable (SGST)',  value: '₹200' },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 border border-border rounded-xl p-3">
                  <p className="text-[11px] text-txt-muted uppercase tracking-wide leading-tight">{item.label}</p>
                  <p className="text-[18px] font-bold text-txt-primary mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'Sales MIS' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="section-title">Consolidated Sales MIS Report</h2>
              <p className="text-[13px] text-txt-muted mt-0.5">Month-wise sales performance — Medicine vs Others</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => downloadCSV(['Month', 'Medicine (₹)', 'Others (₹)', 'Total (₹)', 'Invoices', 'Customers'], ['month', 'medicine', 'others', 'total', 'invoices', 'customers'], misSalesData, 'sales_mis_report')} className="btn-primary btn-sm"><Download size={14} />Download Excel</button>
            </div>
          </div>

          {/* Category KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Sales (Medicine)', value: `₹${(misSalesData.reduce((s, m) => s + m.medicine, 0) / 100000).toFixed(1)}L`, color: 'text-primary' },
              { label: 'Total Sales (Others)',   value: `₹${(misSalesData.reduce((s, m) => s + m.others, 0) / 100000).toFixed(1)}L`,   color: 'text-purple-600' },
              { label: 'Total Invoices',         value: misSalesData.reduce((s, m) => s + m.invoices, 0),                               color: 'text-txt-primary' },
              { label: 'Unique Customers',       value: Math.max(...misSalesData.map(m => m.customers)),                                color: 'text-green-700' },
            ].map(c => (
              <div key={c.label} className="bg-white border border-border rounded-xl p-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
                <p className="text-[11px] text-txt-muted uppercase tracking-wide font-medium leading-tight">{c.label}</p>
                <p className={`text-[22px] font-bold mt-1 ${c.color}`}>{c.value}</p>
              </div>
            ))}
          </div>

          {/* MIS Table */}
          <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="text-left px-4 py-3 font-semibold text-[12px]">Month</th>
                    <th className="text-right px-4 py-3 font-semibold text-[12px]">Medicine Sales (₹)</th>
                    <th className="text-right px-4 py-3 font-semibold text-[12px]">Others Sales (₹)</th>
                    <th className="text-right px-4 py-3 font-semibold text-[12px]">Total Revenue (₹)</th>
                    <th className="text-right px-4 py-3 font-semibold text-[12px]">Invoices</th>
                    <th className="text-right px-4 py-3 font-semibold text-[12px]">Customers</th>
                    <th className="text-right px-4 py-3 font-semibold text-[12px]">Med %</th>
                  </tr>
                </thead>
                <tbody>
                  {misSalesData.map((m, i) => {
                    const medPct = Math.round(m.medicine / m.total * 100)
                    return (
                      <tr key={m.month} className={`border-b border-border hover:bg-blue-50/20 ${i % 2 === 1 ? 'bg-slate-50/30' : ''}`}>
                        <td className="px-4 py-3 font-semibold text-txt-primary">{m.month}</td>
                        <td className="px-4 py-3 text-right font-mono text-[12px] text-primary">₹{m.medicine.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-right font-mono text-[12px] text-purple-600">₹{m.others.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-right font-bold text-txt-primary">₹{m.total.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-right text-txt-secondary">{m.invoices}</td>
                        <td className="px-4 py-3 text-right text-txt-secondary">{m.customers}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${medPct}%` }} />
                            </div>
                            <span className="text-[12px] font-semibold text-txt-primary w-8">{medPct}%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-800 text-white">
                    <td className="px-4 py-3 font-bold">Total</td>
                    <td className="px-4 py-3 text-right font-bold font-mono">₹{misSalesData.reduce((s, m) => s + m.medicine, 0).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-right font-bold font-mono">₹{misSalesData.reduce((s, m) => s + m.others, 0).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-right font-bold font-mono">₹{misSalesData.reduce((s, m) => s + m.total, 0).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-right font-bold">{misSalesData.reduce((s, m) => s + m.invoices, 0)}</td>
                    <td className="px-4 py-3 text-right font-bold">{Math.max(...misSalesData.map(m => m.customers))}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* MIS chart */}
          <div className="card p-6">
            <h2 className="section-title mb-1">Revenue Trend — Medicine vs Others</h2>
            <p className="text-[13px] text-txt-muted mb-5">6-month category-wise breakdown</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={misSalesData} barSize={24} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={v => [`₹${v.toLocaleString('en-IN')}`, '']} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="medicine" name="Medicine" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="others"   name="Others"   fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
