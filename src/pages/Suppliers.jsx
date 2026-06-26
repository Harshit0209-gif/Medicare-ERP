import { useState, useMemo } from 'react'
import {
  Search, Plus, Edit2, Trash2, X,
  Truck, Phone, Mail, MapPin,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ChevronsUpDown,
} from 'lucide-react'
import { suppliers as initialSuppliers, purchaseOrders as initialPOs } from '../data/mockData'

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
      <div className="modal-box w-full mx-4">{children}</div>
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
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
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
          <div className="col-span-2">
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

const TABS = ['Suppliers', 'Purchase Orders']

export default function Suppliers() {
  const [tab, setTab]               = useState('Suppliers')
  const [suppliers, setSuppliers]   = useState(initialSuppliers)
  const [pos, setPOs]               = useState(initialPOs)
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
        <button onClick={() => setModal('add')} className="btn-primary"><Plus size={16} />
          {tab === 'Suppliers' ? 'Add Supplier' : 'New PO'}
        </button>
      </div>

      {/* Tabs + Search row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1 bg-white border border-border rounded-card p-1 shadow-card">
          {TABS.map(t => (
            <button key={t} onClick={() => { setTab(t); setSearch(''); setSortCol(null) }}
              className={`px-4 py-2 rounded-btn text-[13px] font-semibold transition-all duration-200 ${tab === t ? 'bg-primary text-white shadow-sm' : 'text-txt-secondary hover:text-txt-primary'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="relative w-64">
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
