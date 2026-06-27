import { useState, useMemo } from 'react'
import {
  Search, Plus, Filter, Edit2, Trash2, X,
  Package, ChevronLeft, ChevronRight, Download,
  AlertTriangle, ChevronUp, ChevronDown, ChevronsUpDown,
} from 'lucide-react'
import { products as initialProducts } from '../data/mockData'
import { downloadCSV } from '../utils/pdfUtils'

const categories = ['All', 'Analgesics', 'Antibiotics', 'Antidiabetics', 'Cardiovascular', 'Gastrointestinal', 'Antihistamines', 'Vitamins', 'Respiratory']
const statuses   = ['All', 'In Stock', 'Low Stock', 'Expired']
const PAGE_SIZE  = 8

const statusBadge = { 'In Stock': 'badge-success', 'Low Stock': 'badge-warning', 'Expired': 'badge-danger' }

/* ── Sort header ── */
function SortTh({ col, label, sortCol, sortDir, onSort, className = '' }) {
  const active = sortCol === col
  return (
    <th
      onClick={() => onSort(col)}
      className={`cursor-pointer select-none group hover:bg-primary/5 transition-colors ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span>{label}</span>
        <span className={`transition-colors flex-shrink-0 ${active ? 'text-primary' : 'text-slate-300 group-hover:text-slate-400'}`}>
          {active
            ? sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
            : <ChevronsUpDown size={12} />}
        </span>
      </div>
    </th>
  )
}

/* ── Modal wrapper ── */
function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box sm:!max-w-2xl">{children}</div>
    </div>
  )
}

/* ── Product form ── */
function ProductForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || {
    name: '', category: 'Analgesics', manufacturer: '', batch: '',
    expiry: '', stock: '', minStock: '', price: '', costPrice: '', status: 'In Stock',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <>
      <div className="modal-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package size={17} className="text-primary" />
          </div>
          <h3 className="text-[18px] font-semibold text-txt-primary">{initial ? 'Edit Product' : 'Add New Product'}</h3>
        </div>
        <button onClick={onClose} className="btn-icon"><X size={20} /></button>
      </div>
      <div className="modal-body space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="form-label">Medicine Name *</label>
            <input className="form-input" placeholder="e.g. Paracetamol 500mg" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
              {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Manufacturer</label>
            <input className="form-input" placeholder="e.g. GSK Pharma" value={form.manufacturer} onChange={e => set('manufacturer', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Batch Number</label>
            <input className="form-input" placeholder="e.g. BT-2024-001" value={form.batch} onChange={e => set('batch', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Expiry Date</label>
            <input type="date" className="form-input" value={form.expiry} onChange={e => set('expiry', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Current Stock (units)</label>
            <input type="number" className="form-input" placeholder="0" value={form.stock} onChange={e => set('stock', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Min Stock Level</label>
            <input type="number" className="form-input" placeholder="100" value={form.minStock} onChange={e => set('minStock', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Selling Price (₹)</label>
            <input type="number" className="form-input" placeholder="0.00" value={form.price} onChange={e => set('price', e.target.value)} />
          </div>
          <div>
            <label className="form-label">Cost Price (₹)</label>
            <input type="number" className="form-input" placeholder="0.00" value={form.costPrice} onChange={e => set('costPrice', e.target.value)} />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={onClose} className="btn-outline">Cancel</button>
        <button onClick={() => onSave(form)} className="btn-primary">
          <Package size={15} />{initial ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </>
  )
}

export default function Inventory() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch]           = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter]     = useState('All')
  const [sortCol, setSortCol]               = useState(null)
  const [sortDir, setSortDir]               = useState('asc')
  const [page, setPage]                     = useState(1)
  const [modal, setModal]                   = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [deleteId, setDeleteId]             = useState(null)

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
    setPage(1)
  }

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
        p.batch.toLowerCase().includes(search.toLowerCase())
      const matchCat    = categoryFilter === 'All' || p.category === categoryFilter
      const matchStatus = statusFilter   === 'All' || p.status   === statusFilter
      return matchSearch && matchCat && matchStatus
    })
  }, [products, search, categoryFilter, statusFilter])

  const sorted = useMemo(() => {
    if (!sortCol) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sortCol], bv = b[sortCol]
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortCol, sortDir])

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paged      = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const closeModal = () => { setModal(null); setSelectedProduct(null) }

  const handleSave = (form) => {
    if (modal === 'add') {
      setProducts(p => [...p, { ...form, id: Date.now(), stock: +form.stock, minStock: +form.minStock, price: +form.price, costPrice: +form.costPrice }])
    } else {
      setProducts(p => p.map(prod => prod.id === selectedProduct.id
        ? { ...prod, ...form, stock: +form.stock, minStock: +form.minStock, price: +form.price, costPrice: +form.costPrice }
        : prod))
    }
    closeModal()
  }

  const handleDelete = (id) => { setProducts(p => p.filter(prod => prod.id !== id)); setDeleteId(null) }

  const sortProps = { sortCol, sortDir, onSort: handleSort }

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Product Inventory</h1>
          <p className="text-[13px] text-txt-muted mt-0.5">{products.length} products · {products.filter(p => p.status === 'In Stock').length} in stock</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => downloadCSV(
              ['Name', 'Category', 'Manufacturer', 'Batch', 'Expiry', 'Stock', 'Min Stock', 'Price (₹)', 'Cost Price (₹)', 'Status'],
              ['name', 'category', 'manufacturer', 'batch', 'expiry', 'stock', 'minStock', 'price', 'costPrice', 'status'],
              sorted, 'inventory_products'
            )}
            className="btn-outline btn-sm"
          ><Download size={14} />Export CSV</button>
          <button onClick={() => { setSelectedProduct(null); setModal('add') }} className="btn-primary">
            <Plus size={16} />Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-card border border-border shadow-card p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
          <input
            className="form-input pl-9 py-2 text-[13px]"
            placeholder="Search by name, batch, manufacturer…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-txt-muted" />
          <div className="flex gap-1.5 flex-wrap">
            {categories.slice(0, 5).map(c => (
              <button key={c} onClick={() => { setCategoryFilter(c); setPage(1) }}
                className={`px-3 py-1.5 rounded-btn text-[12px] font-medium transition-all ${categoryFilter === c ? 'bg-primary text-white' : 'bg-slate-50 text-txt-secondary border border-border hover:border-primary/40 hover:bg-primary/5'}`}>
                {c}
              </button>
            ))}
            <select
              className="px-2 py-1.5 rounded-btn text-[12px] font-medium bg-slate-50 border border-border text-txt-secondary focus:border-primary outline-none"
              value={categories.slice(5).includes(categoryFilter) ? categoryFilter : ''}
              onChange={e => { if (e.target.value) { setCategoryFilter(e.target.value); setPage(1) } }}
            >
              <option value="">More…</option>
              {categories.slice(5).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-1.5">
            {statuses.map(s => (
              <button key={s} onClick={() => { setStatusFilter(s); setPage(1) }}
                className={`px-3 py-1.5 rounded-btn text-[12px] font-medium transition-all ${statusFilter === s ? 'bg-primary text-white' : 'bg-slate-50 text-txt-secondary border border-border hover:border-primary/40 hover:bg-primary/5'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table w-full border-collapse">
            <thead>
              <tr>
                <th className="w-10">#</th>
                <SortTh col="name"         label="Medicine Name"  {...sortProps} />
                <SortTh col="category"     label="Category"       {...sortProps} />
                <SortTh col="batch"        label="Batch No."      {...sortProps} />
                <SortTh col="expiry"       label="Expiry"         {...sortProps} />
                <SortTh col="stock"        label="Stock"          {...sortProps} />
                <SortTh col="price"        label="Selling Price"  {...sortProps} />
                <SortTh col="status"       label="Status"         {...sortProps} />
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-16 text-txt-muted">
                    <Package size={36} className="mx-auto mb-3 opacity-25" />
                    <p className="text-[14px] font-medium">No products found</p>
                    <p className="text-[12px] mt-1">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : paged.map((p, i) => (
                <tr key={p.id} className="animate-fadeIn" style={{ animationDelay: `${i * 25}ms` }}>
                  <td className="text-txt-muted text-[12px]">{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td>
                    <p className="font-semibold text-txt-primary text-[13px]">{p.name}</p>
                    <p className="text-[11px] text-txt-muted">{p.manufacturer}</p>
                  </td>
                  <td><span className="badge badge-info text-[11px]">{p.category}</span></td>
                  <td className="font-mono text-[12px] text-txt-secondary">{p.batch}</td>
                  <td className="text-[13px] text-txt-secondary">{p.expiry}</td>
                  <td>
                    <p className={`font-bold text-[13px] ${p.stock < p.minStock ? 'text-danger' : 'text-txt-primary'}`}>{p.stock.toLocaleString()}</p>
                    <p className="text-[10px] text-txt-muted">Min: {p.minStock}</p>
                  </td>
                  <td className="font-semibold text-txt-primary text-[13px]">₹{p.price.toFixed(2)}</td>
                  <td><span className={`badge ${statusBadge[p.status]} text-[11px]`}>{p.status}</span></td>
                  <td>
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => { setSelectedProduct(p); setModal('edit') }}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-primary bg-primary/8 hover:bg-primary/15 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={13} />Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-danger bg-red-50 hover:bg-red-100 transition-colors"
                        title="Delete"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-slate-50/50">
            <p className="text-[12px] text-txt-muted">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length} products
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-icon disabled:opacity-40">
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-7 h-7 rounded-btn text-[12px] font-semibold transition-colors ${n === page ? 'bg-primary text-white' : 'text-txt-secondary hover:bg-slate-100'}`}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-icon disabled:opacity-40">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit modal */}
      <Modal open={modal === 'add' || modal === 'edit'} onClose={closeModal}>
        <ProductForm initial={modal === 'edit' ? selectedProduct : null} onSave={handleSave} onClose={closeModal} />
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)}>
        <div className="modal-header">
          <h3 className="text-[17px] font-semibold text-txt-primary">Delete Product?</h3>
          <button onClick={() => setDeleteId(null)} className="btn-icon"><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <Trash2 size={20} className="text-danger" />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-txt-primary">This action cannot be undone.</p>
              <p className="text-[13px] text-txt-secondary mt-1">The product will be permanently removed from the inventory database.</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={() => setDeleteId(null)} className="btn-outline">Cancel</button>
          <button onClick={() => handleDelete(deleteId)} className="btn-danger"><Trash2 size={14} />Yes, Delete</button>
        </div>
      </Modal>
    </div>
  )
}
