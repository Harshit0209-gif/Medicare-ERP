import { useState, useMemo } from 'react'
import {
  Search, Plus, Edit2, Trash2, X, Download,
  ShoppingCart, ChevronLeft, ChevronRight,
  CheckCircle, Clock, AlertTriangle, XCircle, DollarSign, Lock,
  ChevronUp, ChevronDown, ChevronsUpDown, FileCheck, Zap,
} from 'lucide-react'
import { sales as initialSales, eInvoiceData as initialEInv } from '../data/mockData'

const DEMO_TODAY  = '2024-12-10'
const statuses    = ['All', 'Paid', 'Pending', 'Overdue']
const types       = ['All', 'Hospital', 'Clinic', 'Pharmacy']
const PAGE_SIZE   = 8
const paymentMethods = ['Cash', 'Card', 'UPI', 'Bank Transfer']

const statusBadge = { Paid: 'badge-success', Pending: 'badge-warning', Overdue: 'badge-danger' }
const statusIcon  = { Paid: <CheckCircle size={12} />, Pending: <Clock size={12} />, Overdue: <AlertTriangle size={12} /> }

function SortTh({ col, label, sortCol, sortDir, onSort }) {
  const active = sortCol === col
  return (
    <th onClick={() => onSort(col)} className="cursor-pointer select-none group hover:bg-primary/5 transition-colors">
      <div className="flex items-center gap-1.5">
        <span>{label}</span>
        <span className={`flex-shrink-0 transition-colors ${active ? 'text-primary' : 'text-slate-300 group-hover:text-slate-400'}`}>
          {active ? sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} /> : <ChevronsUpDown size={12} />}
        </span>
      </div>
    </th>
  )
}

function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">{children}</div>
    </div>
  )
}

function NewSaleModal({ onSave, onClose }) {
  const [form, setForm] = useState({ customer: '', type: 'Pharmacy', items: 1, subtotal: '', discount: 0, tax: '', paymentMethod: 'Cash' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const subtotal = parseFloat(form.subtotal) || 0
  const discount = parseFloat(form.discount) || 0
  const tax      = parseFloat(form.tax)      || 0
  const total    = subtotal - discount + tax

  return (
    <>
      <div className="modal-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
            <ShoppingCart size={17} className="text-purple-600" />
          </div>
          <h3 className="text-[18px] font-semibold text-txt-primary">New Sale / Invoice</h3>
        </div>
        <button onClick={onClose} className="btn-icon"><X size={20} /></button>
      </div>
      <div className="modal-body space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="form-label">Customer / Organization *</label>
            <input className="form-input" placeholder="e.g. City Hospital" value={form.customer} onChange={e => set('customer', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Customer Type</label>
            <select className="form-select" value={form.type} onChange={e => set('type', e.target.value)}>
              {types.filter(t => t !== 'All').map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Number of Items</label>
            <input type="number" className="form-input" value={form.items} onChange={e => set('items', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Subtotal (₹)</label>
            <input type="number" className="form-input" placeholder="0.00" value={form.subtotal} onChange={e => set('subtotal', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Discount (₹)</label>
            <input type="number" className="form-input" placeholder="0.00" value={form.discount} onChange={e => set('discount', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Tax / GST (₹)</label>
            <input type="number" className="form-input" placeholder="0.00" value={form.tax} onChange={e => set('tax', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Payment Method</label>
            <select className="form-select" value={form.paymentMethod} onChange={e => set('paymentMethod', e.target.value)}>
              {paymentMethods.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
          <div className="space-y-1.5">
            {[['Subtotal', `₹${subtotal.toFixed(2)}`], ['Discount', `-₹${discount.toFixed(2)}`], ['Tax (GST)', `+₹${tax.toFixed(2)}`]].map(([l, v]) => (
              <div key={l} className="flex justify-between text-[13px] text-txt-secondary"><span>{l}</span><span>{v}</span></div>
            ))}
            <div className="flex justify-between text-[16px] font-bold text-txt-primary border-t border-primary/20 pt-2 mt-1">
              <span>Total</span><span className="text-primary">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={onClose} className="btn-outline">Cancel</button>
        <button onClick={() => onSave({
          id: `INV-2024-${1029 + Math.floor(Math.random() * 10)}`, date: DEMO_TODAY,
          customer: form.customer, type: form.type, items: +form.items,
          subtotal, discount, tax, total, status: 'Pending', paymentMethod: form.paymentMethod,
        })} className="btn-primary">
          <ShoppingCart size={15} />Create Invoice
        </button>
      </div>
    </>
  )
}

function EditSaleModal({ sale, onSave, onClose }) {
  const [status, setStatus] = useState(sale.status)
  const [paymentMethod, setPaymentMethod] = useState(sale.paymentMethod)
  return (
    <>
      <div className="modal-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Edit2 size={17} className="text-primary" />
          </div>
          <div>
            <h3 className="text-[17px] font-semibold text-txt-primary">Edit Invoice</h3>
            <p className="text-[12px] text-txt-muted">{sale.id} · {sale.customer}</p>
          </div>
        </div>
        <button onClick={onClose} className="btn-icon"><X size={20} /></button>
      </div>
      <div className="modal-body space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[['Invoice No.', sale.id], ['Customer', sale.customer], ['Date', sale.date], ['Total', `₹${sale.total.toLocaleString('en-IN')}`]].map(([l, v]) => (
            <div key={l} className="bg-app rounded-xl p-3 border border-border">
              <p className="text-[10px] text-txt-muted uppercase tracking-wide font-medium">{l}</p>
              <p className="text-[14px] font-semibold text-txt-primary mt-0.5">{v}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Payment Status</label>
            <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
              {['Paid', 'Pending', 'Overdue'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Payment Method</label>
            <select className="form-select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
              {paymentMethods.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={onClose} className="btn-outline">Cancel</button>
        <button onClick={() => onSave({ ...sale, status, paymentMethod })} className="btn-primary">
          <Edit2 size={14} />Save Changes
        </button>
      </div>
    </>
  )
}

/* ─── E-Invoice Tab ─── */
function EInvoiceTab({ eInvData, setEInvData }) {
  const pending   = eInvData.filter(e => e.status === 'Pending')
  const generated = eInvData.filter(e => e.status === 'Generated')

  const generateIRN = (id) => {
    setEInvData(d => d.map(e => e.id !== id ? e : {
      ...e,
      irn: `IRN${Date.now()}${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      ackNo: `ACK${Date.now().toString().slice(-8)}`,
      ackDate: DEMO_TODAY,
      status: 'Generated',
    }))
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Invoices',   val: eInvData.length, color: 'text-primary' },
          { label: 'IRN Generated',    val: generated.length, color: 'text-green-700' },
          { label: 'IRN Pending',      val: pending.length,   color: 'text-amber-600' },
        ].map(item => (
          <div key={item.label} className="bg-white border border-border rounded-xl p-4 shadow-card">
            <p className="text-[11px] text-txt-muted uppercase tracking-wide font-medium">{item.label}</p>
            <p className={`text-[22px] font-bold mt-0.5 ${item.color}`}>{item.val}</p>
          </div>
        ))}
      </div>

      {pending.length > 0 && (
        <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[12px] text-amber-800">
          <AlertTriangle size={14} className="flex-shrink-0 mt-0.5 text-amber-500" />
          <span>{pending.length} invoice{pending.length > 1 ? 's' : ''} pending IRN generation. Generate IRN before the due date to remain compliant.</span>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-slate-50 flex items-center justify-between">
          <p className="text-[13px] font-semibold text-txt-primary">E-Invoice Register</p>
          <p className="text-[12px] text-txt-muted">{eInvData.length} invoices</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border">
                {['Invoice No.', 'Date', 'Party', 'GSTIN', 'Amount (₹)', 'IRN', 'ACK No.', 'ACK Date', 'E-Way Bill', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide whitespace-nowrap bg-slate-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eInvData.map((e, i) => (
                <tr key={e.id} className={`border-b border-border hover:bg-blue-50/20 ${i % 2 === 1 ? 'bg-slate-50/30' : ''}`}>
                  <td className="px-4 py-3 font-mono text-[12px] text-primary font-semibold">{e.id}</td>
                  <td className="px-4 py-3 text-txt-secondary">{e.date}</td>
                  <td className="px-4 py-3 font-medium text-txt-primary">{e.party}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-txt-muted">{e.gstin}</td>
                  <td className="px-4 py-3 font-bold text-txt-primary">₹{e.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">
                    {e.irn ? (
                      <span className="font-mono text-[10px] text-txt-secondary truncate max-w-[120px] block" title={e.irn}>{e.irn.slice(0, 16)}…</span>
                    ) : <span className="text-txt-muted text-[12px]">Not generated</span>}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-txt-secondary">{e.ackNo || '—'}</td>
                  <td className="px-4 py-3 text-txt-secondary">{e.ackDate || '—'}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-txt-secondary">{e.ewayBill || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${e.status === 'Generated' ? 'badge-success' : 'badge-warning'} text-[11px]`}>{e.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    {e.status === 'Pending' ? (
                      <button onClick={() => generateIRN(e.id)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-white bg-primary hover:bg-primary/90 transition-colors">
                        <Zap size={12} />Generate IRN
                      </button>
                    ) : (
                      <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors">
                        <FileCheck size={12} />View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Sales Component ─── */
const SALES_TABS = ['Sales Invoices', 'E-Invoice']

export default function Sales() {
  const [activeTab, setActiveTab]   = useState('Sales Invoices')
  const [salesData, setSalesData]   = useState(initialSales)
  const [eInvData, setEInvData]     = useState(initialEInv)
  const [search, setSearch]         = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sortCol, setSortCol]       = useState(null)
  const [sortDir, setSortDir]       = useState('asc')
  const [page, setPage]             = useState(1)
  const [modal, setModal]           = useState(null)
  const [selectedSale, setSelectedSale] = useState(null)
  const [deleteId, setDeleteId]     = useState(null)
  const [editLocked, setEditLocked] = useState(false)

  const totalRevenue = salesData.reduce((s, x) => s + x.total, 0)
  const totalPaid    = salesData.filter(s => s.status === 'Paid').reduce((s, x) => s + x.total, 0)
  const pending      = salesData.filter(s => s.status === 'Pending').length
  const overdue      = salesData.filter(s => s.status === 'Overdue').length

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
    setPage(1)
  }

  const filtered = useMemo(() => salesData.filter(s => {
    const matchSearch = s.id.toLowerCase().includes(search.toLowerCase()) || s.customer.toLowerCase().includes(search.toLowerCase())
    return matchSearch && (statusFilter === 'All' || s.status === statusFilter) && (typeFilter === 'All' || s.type === typeFilter)
  }), [salesData, search, statusFilter, typeFilter])

  const sorted = useMemo(() => {
    if (!sortCol) return filtered
    return [...filtered].sort((a, b) => {
      const cmp = typeof a[sortCol] === 'number' ? a[sortCol] - b[sortCol] : String(a[sortCol]).localeCompare(String(b[sortCol]))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortCol, sortDir])

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paged      = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const sortProps  = { sortCol, sortDir, onSort: handleSort }

  const handleEditClick = (sale) => {
    if (sale.date !== DEMO_TODAY) { setEditLocked(true); return }
    setSelectedSale(sale)
    setModal('edit')
  }

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Sales & Billing</h1>
          <p className="text-[13px] text-txt-muted mt-0.5">{salesData.length} invoices total</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-outline btn-sm"><Download size={14} />Export</button>
          {activeTab === 'Sales Invoices' && <button onClick={() => setModal('new')} className="btn-primary"><Plus size={16} />New Invoice</button>}
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 bg-white border border-border rounded-xl p-1 overflow-x-auto shadow-card max-w-full w-fit sm:w-auto">
        {SALES_TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${activeTab === t ? 'bg-primary text-white shadow-sm' : 'text-txt-secondary hover:text-txt-primary'}`}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'E-Invoice' && <EInvoiceTab eInvData={eInvData} setEInvData={setEInvData} />}

      {activeTab === 'Sales Invoices' && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue',    value: `₹${(totalRevenue / 1000).toFixed(0)}k`, icon: DollarSign,   iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
              { label: 'Amount Received',  value: `₹${(totalPaid    / 1000).toFixed(0)}k`, icon: CheckCircle,  iconBg: 'bg-green-100',  iconColor: 'text-green-600'  },
              { label: 'Pending Invoices', value: pending,                                  icon: Clock,        iconBg: 'bg-amber-100',  iconColor: 'text-amber-600'  },
              { label: 'Overdue Invoices', value: overdue,                                  icon: XCircle,      iconBg: 'bg-red-100',    iconColor: 'text-danger'     },
            ].map(c => {
              const Icon = c.icon
              return (
                <div key={c.label} className="bg-white rounded-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={c.iconColor} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[11px] text-txt-muted font-medium">{c.label}</p>
                    <p className="text-[20px] font-bold text-txt-primary leading-tight">{c.value}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-card border border-border shadow-card p-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
              <input className="form-input pl-9 py-2 text-[13px]" placeholder="Search invoice or customer…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {statuses.map(s => (
                <button key={s} onClick={() => { setStatusFilter(s); setPage(1) }}
                  className={`px-3 py-1.5 rounded-btn text-[12px] font-medium transition-all ${statusFilter === s ? 'bg-primary text-white' : 'bg-slate-50 text-txt-secondary border border-border hover:border-primary/40 hover:bg-primary/5'}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {types.map(t => (
                <button key={t} onClick={() => { setTypeFilter(t); setPage(1) }}
                  className={`px-3 py-1.5 rounded-btn text-[12px] font-medium transition-all ${typeFilter === t ? 'bg-purple-600 text-white' : 'bg-slate-50 text-txt-secondary border border-border hover:border-purple-300 hover:bg-purple-50'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <SortTh col="id"            label="Invoice No."  {...sortProps} />
                    <SortTh col="date"          label="Date"         {...sortProps} />
                    <SortTh col="customer"      label="Customer"     {...sortProps} />
                    <SortTh col="type"          label="Type"         {...sortProps} />
                    <SortTh col="items"         label="Items"        {...sortProps} />
                    <SortTh col="total"         label="Total"        {...sortProps} />
                    <SortTh col="paymentMethod" label="Payment"      {...sortProps} />
                    <SortTh col="status"        label="Status"       {...sortProps} />
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.length === 0 ? (
                    <tr><td colSpan={9} className="text-center py-16 text-txt-muted">
                      <ShoppingCart size={36} className="mx-auto mb-3 opacity-25" />
                      <p className="text-[14px] font-medium">No invoices found</p>
                    </td></tr>
                  ) : paged.map((s, i) => {
                    const editable = s.date === DEMO_TODAY
                    return (
                      <tr key={s.id} className="animate-fadeIn" style={{ animationDelay: `${i * 25}ms` }}>
                        <td className="font-mono text-[12px] text-primary font-semibold">{s.id}</td>
                        <td className="text-[13px] text-txt-secondary">{s.date}</td>
                        <td className="font-semibold text-txt-primary text-[13px]">{s.customer}</td>
                        <td><span className="badge badge-info text-[11px]">{s.type}</span></td>
                        <td className="text-txt-secondary text-[13px]">{s.items}</td>
                        <td className="font-bold text-txt-primary text-[13px]">₹{s.total.toLocaleString('en-IN')}</td>
                        <td className="text-[13px] text-txt-secondary">{s.paymentMethod}</td>
                        <td>
                          <span className={`badge ${statusBadge[s.status]} flex items-center gap-1 w-fit text-[11px]`}>
                            {statusIcon[s.status]}{s.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleEditClick(s)}
                              title={!editable ? 'Edit window expired (24h limit)' : ''}
                              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${editable ? 'text-primary bg-primary/8 hover:bg-primary/15' : 'text-slate-400 bg-slate-50 cursor-not-allowed'}`}
                            >
                              {editable ? <Edit2 size={13} /> : <Lock size={13} />}Edit
                            </button>
                            <button
                              onClick={() => setDeleteId(s.id)}
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-danger bg-red-50 hover:bg-red-100 transition-colors"
                            >
                              <Trash2 size={13} />Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-slate-50/50">
                <p className="text-[12px] text-txt-muted">Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length}</p>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-icon disabled:opacity-40"><ChevronLeft size={15} /></button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <button key={n} onClick={() => setPage(n)} className={`w-7 h-7 rounded-btn text-[12px] font-semibold transition-colors ${n === page ? 'bg-primary text-white' : 'text-txt-secondary hover:bg-slate-100'}`}>{n}</button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-icon disabled:opacity-40"><ChevronRight size={15} /></button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modals */}
      <Modal open={modal === 'new'} onClose={() => setModal(null)}>
        <NewSaleModal onSave={s => { setSalesData(d => [s, ...d]); setModal(null) }} onClose={() => setModal(null)} />
      </Modal>
      <Modal open={modal === 'edit' && !!selectedSale} onClose={() => { setModal(null); setSelectedSale(null) }}>
        <EditSaleModal
          sale={selectedSale}
          onSave={updated => { setSalesData(d => d.map(x => x.id === updated.id ? updated : x)); setModal(null); setSelectedSale(null) }}
          onClose={() => { setModal(null); setSelectedSale(null) }}
        />
      </Modal>
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)}>
        <div className="modal-header">
          <h3 className="text-[17px] font-semibold text-txt-primary">Delete Invoice?</h3>
          <button onClick={() => setDeleteId(null)} className="btn-icon"><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <Trash2 size={20} className="text-danger" />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-txt-primary">This will permanently delete the invoice.</p>
              <p className="text-[13px] text-txt-secondary mt-1">This action cannot be undone. Financial records will be affected.</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={() => setDeleteId(null)} className="btn-outline">Cancel</button>
          <button onClick={() => { setSalesData(d => d.filter(x => x.id !== deleteId)); setDeleteId(null) }} className="btn-danger"><Trash2 size={14} />Delete Invoice</button>
        </div>
      </Modal>

      {/* 1-day edit lock modal */}
      <Modal open={editLocked} onClose={() => setEditLocked(false)}>
        <div className="modal-header">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
              <Lock size={17} className="text-amber-600" />
            </div>
            <h3 className="text-[17px] font-semibold text-txt-primary">Edit Window Expired</h3>
          </div>
          <button onClick={() => setEditLocked(false)} className="btn-icon"><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-txt-primary">This invoice cannot be edited.</p>
              <p className="text-[13px] text-txt-secondary mt-2 leading-relaxed">
                Invoices can only be modified within <strong>24 hours</strong> of creation. To make changes to this invoice, please raise a Credit / Debit Note from the Accounts module.
              </p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={() => setEditLocked(false)} className="btn-primary">Understood</button>
        </div>
      </Modal>
    </div>
  )
}
