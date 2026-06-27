import { useState, useMemo } from 'react'
import {
  Search, Plus, Edit2, Trash2, X,
  Truck, Phone, Mail, MapPin, Download,
  ChevronUp, ChevronDown, ChevronsUpDown,
} from 'lucide-react'
import { suppliers as initialSuppliers, purchaseOrders as initialPOs, vendorPurchases as initialVP } from '../data/mockData'

const poStatusBadge  = { Delivered: 'badge-success', 'In Transit': 'badge-info', Ordered: 'badge-warning', Cancelled: 'badge-danger' }
const payStatusBadge = { Paid: 'badge-success', Pending: 'badge-warning', Partial: 'badge-info' }

/* ── Sort header ── */
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

function SupplierForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { name: '', contact: '', phone: '', email: '', address: '', category: 'Full Range', status: 'Active' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <>
      <div className="modal-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal/10 flex items-center justify-center">
            <Truck size={17} className="text-teal" />
          </div>
          <h3 className="text-[18px] font-semibold text-txt-primary">{initial ? 'Edit Supplier' : 'Add New Supplier'}</h3>
        </div>
        <button onClick={onClose} className="btn-icon"><X size={20} /></button>
      </div>
      <div className="modal-body space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="form-label">Company Name *</label>
            <input className="form-input" placeholder="e.g. MedPharm Distributors" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Contact Person</label>
            <input className="form-input" placeholder="Full name" value={form.contact} onChange={e => set('contact', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input type="email" className="form-input" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
              {['Full Range', 'Generic', 'Branded', 'Specialty', 'Imports'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="form-label">Address</label>
            <textarea className="form-input min-h-[68px] resize-none" value={form.address} onChange={e => set('address', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={onClose} className="btn-outline">Cancel</button>
        <button onClick={() => onSave(form)} className="btn-primary"><Truck size={14} />{initial ? 'Update Supplier' : 'Add Supplier'}</button>
      </div>
    </>
  )
}

const vpStatusBadge  = { Received: 'badge-success', 'In Transit': 'badge-info', Partial: 'badge-warning', Ordered: 'badge-gray' }
const vpPayBadge     = { Paid: 'badge-success', Pending: 'badge-warning', Partial: 'badge-info', 'Advance Paid': 'badge-gray' }

function downloadCSV(headers, keys, rows, filename) {
  const lines = [headers.join(','), ...rows.map(r => keys.map(k => `"${r[k] ?? ''}"`).join(','))]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = `${filename}.csv`
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function VendorPurchaseForm({ onSave, onClose }) {
  const [form, setForm] = useState({ vendor: '', category: 'Medicine', date: '2024-12-10', items: '', amount: '', gstRate: '5', remarks: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const gst   = Math.round(parseFloat(form.amount || 0) * parseFloat(form.gstRate) / 100)
  const total = parseFloat(form.amount || 0) + gst

  return (
    <>
      <div className="modal-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal/10 flex items-center justify-center">
            <Truck size={17} className="text-teal" />
          </div>
          <h3 className="text-[17px] font-semibold text-txt-primary">New Vendor Purchase</h3>
        </div>
        <button onClick={onClose} className="btn-icon"><X size={20} /></button>
      </div>
      <div className="modal-body space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="form-label">Vendor Name *</label>
            <input className="form-input" placeholder="Select or type vendor name" value={form.vendor} onChange={e => set('vendor', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Category *</label>
            <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
              <option value="Medicine">Medicine</option>
              <option value="Others">Others (Devices, Consumables, etc.)</option>
            </select>
          </div>
          <div>
            <label className="form-label">Purchase Date</label>
            <input type="date" className="form-input" value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
          <div>
            <label className="form-label">No. of Items</label>
            <input type="number" className="form-input" placeholder="0" value={form.items} onChange={e => set('items', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Purchase Amount (₹) *</label>
            <input type="number" className="form-input" placeholder="0.00" value={form.amount} onChange={e => set('amount', e.target.value)} />
          </div>
          <div>
            <label className="form-label">GST Rate</label>
            <select className="form-select" value={form.gstRate} onChange={e => set('gstRate', e.target.value)}>
              {['0', '5', '12', '18'].map(r => <option key={r} value={r}>{r}%</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="form-label">Remarks</label>
            <input className="form-input" placeholder="Optional note" value={form.remarks} onChange={e => set('remarks', e.target.value)} />
          </div>
        </div>
        <div className="bg-slate-50 border border-border rounded-xl p-3 text-[13px] space-y-1">
          <div className="flex justify-between"><span className="text-txt-secondary">Purchase Value:</span><span className="font-semibold">₹{parseFloat(form.amount || 0).toLocaleString('en-IN')}</span></div>
          <div className="flex justify-between"><span className="text-txt-secondary">GST ({form.gstRate}%):</span><span className="font-semibold">₹{gst.toLocaleString('en-IN')}</span></div>
          <div className="flex justify-between border-t border-border pt-1 mt-1"><span className="font-semibold text-txt-primary">Total:</span><span className="font-bold text-primary">₹{total.toLocaleString('en-IN')}</span></div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={onClose} className="btn-outline">Cancel</button>
        <button onClick={() => onSave({ ...form, gst, total: parseFloat(form.amount || 0) + gst, items: parseInt(form.items || 0), amount: parseFloat(form.amount || 0) })} className="btn-primary"><Truck size={14} />Save Purchase</button>
      </div>
    </>
  )
}

const TABS = ['Suppliers', 'Purchase Orders', 'Vendor Purchase']

export default function Suppliers() {
  const [tab, setTab]               = useState('Suppliers')
  const [suppliers, setSuppliers]   = useState(initialSuppliers)
  const [pos, setPOs]               = useState(initialPOs)
  const [vpData, setVpData]         = useState(initialVP)
  const [vpCatFilter, setVpCatFilter] = useState('All')
  const [vpShowModal, setVpShowModal] = useState(false)
  const [search, setSearch]         = useState('')
  const [sortCol, setSortCol]       = useState(null)
  const [sortDir, setSortDir]       = useState('asc')
  const [modal, setModal]           = useState(null)
  const [selected, setSelected]     = useState(null)
  const [deleteId, setDeleteId]     = useState(null)

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }
  const sortProps = { sortCol, sortDir, onSort: handleSort }

  const filteredSuppliers = useMemo(() =>
    suppliers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.contact.toLowerCase().includes(search.toLowerCase())),
    [suppliers, search])

  const filteredPOs = useMemo(() => {
    const base = pos.filter(p => p.id.toLowerCase().includes(search.toLowerCase()) || p.supplier.toLowerCase().includes(search.toLowerCase()))
    if (!sortCol) return base
    return [...base].sort((a, b) => {
      const av = a[sortCol], bv = b[sortCol]
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [pos, search, sortCol, sortDir])

  const handleSaveSupplier = (form) => {
    if (modal === 'edit') {
      setSuppliers(s => s.map(sup => sup.id === selected.id ? { ...sup, ...form } : sup))
    } else {
      setSuppliers(s => [...s, { ...form, id: Date.now(), totalOrders: 0, totalValue: 0, rating: 0, joined: new Date().toISOString().split('T')[0] }])
    }
    setModal(null); setSelected(null)
  }

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Suppliers & Purchase Orders</h1>
          <p className="text-[13px] text-txt-muted mt-0.5">{suppliers.length} suppliers · {pos.length} orders</p>
        </div>
        {tab !== 'Vendor Purchase' && (
          <button onClick={() => setModal('add')} className="btn-primary"><Plus size={16} />
            {tab === 'Suppliers' ? 'Add Supplier' : 'New PO'}
          </button>
        )}
      </div>

      {/* Tabs + Search row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 overflow-x-auto bg-white border border-border rounded-card p-1 shadow-card w-full sm:w-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => { setTab(t); setSearch(''); setSortCol(null) }}
              className={`px-4 py-2 rounded-btn text-[13px] font-semibold transition-all duration-200 whitespace-nowrap ${tab === t ? 'bg-primary text-white shadow-sm' : 'text-txt-secondary hover:text-txt-primary'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
          <input className="form-input pl-9 py-2 text-[13px]"
            placeholder={tab === 'Suppliers' ? 'Search suppliers…' : 'Search purchase orders…'}
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Supplier cards */}
      {tab === 'Suppliers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSuppliers.map((s, i) => (
            <div key={s.id} className="bg-white rounded-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-5 animate-fadeIn" style={{ animationDelay: `${i * 50}ms` }}>
              {/* Card header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal to-primary flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0">
                    {s.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-txt-primary leading-tight truncate">{s.name}</p>
                    <p className="text-[11px] text-txt-muted">{s.contact}</p>
                  </div>
                </div>
                <span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-gray'} flex-shrink-0`}>{s.status}</span>
              </div>

              {/* Contact info */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-[12px] text-txt-secondary">
                  <Phone size={11} className="text-txt-muted flex-shrink-0" />{s.phone}
                </div>
                <div className="flex items-center gap-2 text-[12px] text-txt-secondary truncate">
                  <Mail size={11} className="text-txt-muted flex-shrink-0" />{s.email}
                </div>
                <div className="flex items-start gap-2 text-[11px] text-txt-muted">
                  <MapPin size={11} className="flex-shrink-0 mt-0.5" />
                  <span className="leading-snug line-clamp-1">{s.address}</span>
                </div>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-slate-50 rounded-xl border border-border">
                {[['Orders', s.totalOrders], ['Value', `₹${(s.totalValue / 1000).toFixed(0)}k`], ['Rating', `${s.rating}★`]].map(([l, v]) => (
                  <div key={l} className="text-center">
                    <p className="text-[10px] text-txt-muted font-medium">{l}</p>
                    <p className="text-[13px] font-bold text-txt-primary">{v}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setSelected(s); setModal('edit') }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold text-primary bg-primary/8 hover:bg-primary/15 transition-colors"
                >
                  <Edit2 size={13} />Edit
                </button>
                <button
                  onClick={() => setDeleteId(s.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold text-danger bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={13} />Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PO Table */}
      {tab === 'Purchase Orders' && (
        <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table w-full border-collapse">
              <thead>
                <tr>
                  <SortTh col="id"              label="PO Number"          {...sortProps} />
                  <SortTh col="supplier"         label="Supplier"           {...sortProps} />
                  <SortTh col="date"             label="Order Date"         {...sortProps} />
                  <SortTh col="expectedDelivery" label="Expected Delivery"  {...sortProps} />
                  <SortTh col="items"            label="Items"              {...sortProps} />
                  <SortTh col="total"            label="Total Value"        {...sortProps} />
                  <SortTh col="paymentStatus"    label="Payment"            {...sortProps} />
                  <SortTh col="status"           label="Status"             {...sortProps} />
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPOs.map((po, i) => (
                  <tr key={po.id} className="animate-fadeIn" style={{ animationDelay: `${i * 25}ms` }}>
                    <td className="font-mono text-[12px] text-primary font-semibold">{po.id}</td>
                    <td className="font-semibold text-txt-primary text-[13px]">{po.supplier}</td>
                    <td className="text-[13px] text-txt-secondary">{po.date}</td>
                    <td className="text-[13px] text-txt-secondary">{po.expectedDelivery}</td>
                    <td className="text-txt-secondary text-[13px]">{po.items} items</td>
                    <td className="font-bold text-txt-primary text-[13px]">₹{po.total.toLocaleString('en-IN')}</td>
                    <td><span className={`badge ${payStatusBadge[po.paymentStatus]} text-[11px]`}>{po.paymentStatus}</span></td>
                    <td><span className={`badge ${poStatusBadge[po.status]} text-[11px]`}>{po.status}</span></td>
                    <td>
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-primary bg-primary/8 hover:bg-primary/15 transition-colors">
                          <Edit2 size={13} />Edit
                        </button>
                        <button
                          onClick={() => setPOs(p => p.filter(x => x.id !== po.id))}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-danger bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={13} />Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vendor Purchase Tab */}
      {tab === 'Vendor Purchase' && (() => {
        const filtered = vpCatFilter === 'All' ? vpData : vpData.filter(v => v.category === vpCatFilter)
        const totalAmt = filtered.reduce((s, v) => s + v.amount, 0)
        const totalGst = filtered.reduce((s, v) => s + v.gst, 0)
        const totalVal = filtered.reduce((s, v) => s + v.total, 0)
        return (
          <div className="space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Total Purchases', val: vpData.length, color: 'text-primary' },
                { label: 'Medicine',        val: vpData.filter(v => v.category === 'Medicine').length, color: 'text-primary' },
                { label: 'Others',          val: vpData.filter(v => v.category === 'Others').length,   color: 'text-purple-600' },
                { label: 'Total Value',     val: `₹${vpData.reduce((s, v) => s + v.total, 0).toLocaleString('en-IN')}`, color: 'text-green-700' },
              ].map(item => (
                <div key={item.label} className="bg-white border border-border rounded-xl p-4 shadow-card">
                  <p className="text-[11px] text-txt-muted uppercase tracking-wide font-medium">{item.label}</p>
                  <p className={`text-[20px] font-bold mt-0.5 ${item.color}`}>{item.val}</p>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-1">
                {['All', 'Medicine', 'Others'].map(c => (
                  <button key={c} onClick={() => setVpCatFilter(c)}
                    className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${vpCatFilter === c ? 'bg-primary text-white' : 'bg-white border border-border text-txt-secondary hover:bg-slate-50'}`}>
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => downloadCSV(['VP No.', 'Date', 'Vendor', 'Category', 'Items', 'Amount', 'GST', 'Total', 'Status', 'Payment'], ['id', 'date', 'vendor', 'category', 'items', 'amount', 'gst', 'total', 'status', 'paymentStatus'], filtered, 'vendor_purchases')} className="btn-outline btn-sm"><Download size={13} />Export</button>
                <button onClick={() => setVpShowModal(true)} className="btn-primary btn-sm"><Plus size={14} />New Purchase</button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-border">
                      {['VP No.', 'Date', 'Vendor', 'Category', 'Items', 'Amount (₹)', 'GST (₹)', 'Total (₹)', 'Status', 'Payment'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((v, i) => (
                      <tr key={v.id} className={`border-b border-border hover:bg-blue-50/20 ${i % 2 === 1 ? 'bg-slate-50/30' : ''}`}>
                        <td className="px-4 py-3 font-mono text-[12px] text-primary font-semibold">{v.id}</td>
                        <td className="px-4 py-3 text-txt-secondary">{v.date}</td>
                        <td className="px-4 py-3 font-medium text-txt-primary">{v.vendor}</td>
                        <td className="px-4 py-3">
                          <span className={`badge ${v.category === 'Medicine' ? 'badge-info' : 'badge-gray'} text-[11px]`}>{v.category}</span>
                        </td>
                        <td className="px-4 py-3 text-txt-secondary">{v.items}</td>
                        <td className="px-4 py-3 font-semibold text-txt-primary">₹{v.amount.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-txt-secondary">₹{v.gst.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 font-bold text-txt-primary">₹{v.total.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3"><span className={`badge ${vpStatusBadge[v.status]} text-[11px]`}>{v.status}</span></td>
                        <td className="px-4 py-3"><span className={`badge ${vpPayBadge[v.paymentStatus]} text-[11px]`}>{v.paymentStatus}</span></td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-primary/5 border-t-2 border-primary/20">
                      <td colSpan={5} className="px-4 py-3 font-semibold text-txt-primary">Total ({filtered.length} purchases)</td>
                      <td className="px-4 py-3 font-bold text-txt-primary">₹{totalAmt.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 font-bold text-txt-secondary">₹{totalGst.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 font-bold text-primary">₹{totalVal.toLocaleString('en-IN')}</td>
                      <td colSpan={2} />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <Modal open={vpShowModal} onClose={() => setVpShowModal(false)}>
              <VendorPurchaseForm
                onSave={form => {
                  setVpData(d => [{ ...form, id: `VP-2024-${String(d.length + 1).padStart(3, '0')}`, status: 'Ordered', paymentStatus: 'Pending' }, ...d])
                  setVpShowModal(false)
                }}
                onClose={() => setVpShowModal(false)}
              />
            </Modal>
          </div>
        )
      })()}

      {/* Add / Edit modal */}
      <Modal open={modal === 'add' || modal === 'edit'} onClose={() => { setModal(null); setSelected(null) }}>
        <SupplierForm initial={modal === 'edit' ? selected : null} onSave={handleSaveSupplier} onClose={() => { setModal(null); setSelected(null) }} />
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)}>
        <div className="modal-header">
          <h3 className="text-[17px] font-semibold text-txt-primary">Delete Supplier?</h3>
          <button onClick={() => setDeleteId(null)} className="btn-icon"><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <Trash2 size={20} className="text-danger" />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-txt-primary">Remove this supplier?</p>
              <p className="text-[13px] text-txt-secondary mt-1">All associated data and purchase history will be unlinked. This cannot be undone.</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={() => setDeleteId(null)} className="btn-outline">Cancel</button>
          <button onClick={() => { setSuppliers(s => s.filter(x => x.id !== deleteId)); setDeleteId(null) }} className="btn-danger">
            <Trash2 size={14} />Delete Supplier
          </button>
        </div>
      </Modal>
    </div>
  )
}
