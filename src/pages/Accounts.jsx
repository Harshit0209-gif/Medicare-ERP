import { useState, useMemo } from 'react'
import {
  Download, Plus, X, AlertTriangle, CheckCircle, Search, Printer,
  FileText, Receipt,
} from 'lucide-react'
import {
  paymentReceipts as initialReceipts,
  creditDebitNotes as initialNotes,
  trialBalanceData,
  outstandingData,
} from '../data/mockData'

const DEMO_TODAY = '2024-12-10'

function downloadCSV(headers, keys, rows, filename) {
  const lines = [
    headers.join(','),
    ...rows.map(r => keys.map(k => `"${r[k] ?? ''}"`).join(',')),
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">{children}</div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   TAB 1 — Payment Receipt
───────────────────────────────────────────── */
function PaymentReceiptTab({ receipts, setReceipts }) {
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [modeFilter, setModeFilter] = useState('All')
  const [form, setForm] = useState({ party: '', date: DEMO_TODAY, amount: '', mode: 'Bank Transfer', utr: '', bank: '', against: '', remarks: '' })
  const [utrWarning, setUtrWarning] = useState('')

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (k === 'utr') {
      const existing = receipts.map(r => r.utr).filter(u => u && u !== '-')
      setUtrWarning(v && existing.includes(v)
        ? 'This UTR number is already recorded. Please verify before saving.'
        : '')
    }
  }

  const filtered = useMemo(() =>
    receipts.filter(r => {
      const q = search.toLowerCase()
      return (r.party.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.utr.toLowerCase().includes(q))
        && (modeFilter === 'All' || r.mode === modeFilter)
    }), [receipts, search, modeFilter])

  const total = filtered.reduce((s, r) => s + r.amount, 0)

  const handleSave = () => {
    if (!form.party || !form.amount) return
    setReceipts(r => [{
      id: `REC-2024-${String(r.length + 1).padStart(3, '0')}`,
      date: form.date, party: form.party, amount: parseFloat(form.amount),
      mode: form.mode, utr: form.utr || '-', bank: form.bank || '-',
      status: 'Cleared', against: form.against || '-', remarks: form.remarks,
    }, ...r])
    setShowModal(false)
    setForm({ party: '', date: DEMO_TODAY, amount: '', mode: 'Bank Transfer', utr: '', bank: '', against: '', remarks: '' })
    setUtrWarning('')
  }

  return (
    <div className="space-y-4">
      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Receipts', val: receipts.length, color: 'text-primary' },
          { label: 'Total Collected', val: `₹${receipts.reduce((s, r) => s + r.amount, 0).toLocaleString('en-IN')}`, color: 'text-green-700' },
          { label: 'Cleared', val: receipts.filter(r => r.status === 'Cleared').length, color: 'text-green-700' },
          { label: 'Pending', val: receipts.filter(r => r.status === 'Pending').length, color: 'text-amber-600' },
        ].map(item => (
          <div key={item.label} className="bg-white border border-border rounded-xl p-4 shadow-card">
            <p className="text-[11px] text-txt-muted uppercase tracking-wide font-medium">{item.label}</p>
            <p className={`text-[22px] font-bold mt-0.5 ${item.color}`}>{item.val}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
            <input className="form-input pl-8 py-2 text-[13px] w-56" placeholder="Search party, UTR…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1 flex-wrap">
            {['All', 'Cash', 'UPI', 'Card', 'Bank Transfer'].map(m => (
              <button key={m} onClick={() => setModeFilter(m)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${modeFilter === m ? 'bg-primary text-white' : 'bg-slate-50 border border-border text-txt-secondary hover:bg-slate-100'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => downloadCSV(['Receipt No.', 'Date', 'Party', 'Mode', 'UTR', 'Amount', 'Status'], ['id', 'date', 'party', 'mode', 'utr', 'amount', 'status'], filtered, 'payment_receipts')} className="btn-outline btn-sm"><Download size={13} />Export</button>
          <button onClick={() => setShowModal(true)} className="btn-primary btn-sm"><Plus size={14} />New Receipt</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                {['Receipt No.', 'Date', 'Party', 'Against Invoice', 'Mode', 'UTR / Ref. No.', 'Amount (₹)', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-txt-secondary text-[11px] uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} className={`border-b border-border hover:bg-blue-50/30 transition-colors ${i % 2 === 1 ? 'bg-slate-50/30' : ''}`}>
                  <td className="px-4 py-3 font-mono text-[12px] text-primary font-semibold">{r.id}</td>
                  <td className="px-4 py-3 text-txt-secondary">{r.date}</td>
                  <td className="px-4 py-3 font-medium text-txt-primary">{r.party}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-txt-muted">{r.against}</td>
                  <td className="px-4 py-3 text-txt-secondary">{r.mode}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-txt-secondary">{r.utr}</td>
                  <td className="px-4 py-3 font-bold text-txt-primary">₹{r.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3"><span className={`badge ${r.status === 'Cleared' ? 'badge-success' : 'badge-warning'} text-[11px]`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-primary/5 border-t-2 border-primary/20">
                <td colSpan={6} className="px-4 py-3 font-semibold text-txt-primary text-[13px]">Total — {filtered.length} receipts</td>
                <td className="px-4 py-3 font-bold text-primary text-[15px]">₹{total.toLocaleString('en-IN')}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* New Receipt Modal */}
      <Modal open={showModal} onClose={() => { setShowModal(false); setUtrWarning('') }}>
        <div className="modal-header">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal/10 flex items-center justify-center">
              <Receipt size={17} className="text-teal" />
            </div>
            <h3 className="text-[17px] font-semibold text-txt-primary">Record Payment Receipt</h3>
          </div>
          <button onClick={() => { setShowModal(false); setUtrWarning('') }} className="btn-icon"><X size={20} /></button>
        </div>
        <div className="modal-body space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="form-label">Party Name *</label>
              <input className="form-input" placeholder="Customer / Vendor name" value={form.party} onChange={e => set('party', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Date</label>
              <input type="date" className="form-input" value={form.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Amount (₹) *</label>
              <input type="number" className="form-input" placeholder="0.00" value={form.amount} onChange={e => set('amount', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Payment Mode</label>
              <select className="form-select" value={form.mode} onChange={e => set('mode', e.target.value)}>
                {['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Against Invoice</label>
              <input className="form-input" placeholder="INV-2024-XXXX" value={form.against} onChange={e => set('against', e.target.value)} />
            </div>
            <div>
              <label className="form-label">UTR / Cheque / Ref. No.</label>
              <input className="form-input" placeholder="Transaction reference" value={form.utr} onChange={e => set('utr', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Bank Name</label>
              <input className="form-input" placeholder="e.g. HDFC Bank" value={form.bank} onChange={e => set('bank', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Remarks</label>
              <input className="form-input" placeholder="Optional note" value={form.remarks} onChange={e => set('remarks', e.target.value)} />
            </div>
          </div>
          {utrWarning && (
            <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[12px] text-amber-800">
              <AlertTriangle size={14} className="flex-shrink-0 mt-0.5 text-amber-500" />
              <span>{utrWarning}</span>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={() => { setShowModal(false); setUtrWarning('') }} className="btn-outline">Cancel</button>
          <button onClick={handleSave} className="btn-primary"><CheckCircle size={14} />Save Receipt</button>
        </div>
      </Modal>
    </div>
  )
}

/* ─────────────────────────────────────────────
   TAB 2 — Receipt Register
───────────────────────────────────────────── */
function ReceiptRegisterTab({ receipts }) {
  const [dateFrom, setDateFrom] = useState('2024-12-01')
  const [dateTo, setDateTo]     = useState(DEMO_TODAY)

  const filtered = receipts.filter(r => r.date >= dateFrom && r.date <= dateTo)
  const total    = filtered.reduce((s, r) => s + r.amount, 0)

  const modeSummary = ['Cash', 'UPI', 'Card', 'Bank Transfer'].map(mode => ({
    mode,
    count:  filtered.filter(r => r.mode === mode).length,
    amount: filtered.filter(r => r.mode === mode).reduce((s, r) => s + r.amount, 0),
  })).filter(m => m.count > 0)

  return (
    <div className="space-y-4">
      <div className="bg-white border border-border rounded-xl p-4 shadow-card flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-[13px] font-medium text-txt-secondary">From</label>
          <input type="date" className="form-input py-2 text-[13px]" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          <label className="text-[13px] font-medium text-txt-secondary">To</label>
          <input type="date" className="form-input py-2 text-[13px]" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
        <div className="ml-auto flex gap-2">
          <button onClick={() => downloadCSV(['Receipt No.', 'Date', 'Party', 'Mode', 'UTR', 'Amount'], ['id', 'date', 'party', 'mode', 'utr', 'amount'], filtered, 'receipt_register')} className="btn-outline btn-sm"><Download size={13} />Download</button>
          <button className="btn-outline btn-sm"><Printer size={13} />Print</button>
        </div>
      </div>

      {modeSummary.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {modeSummary.map(m => (
            <div key={m.mode} className="bg-white border border-border rounded-xl p-3 shadow-card">
              <p className="text-[11px] text-txt-muted uppercase tracking-wide">{m.mode}</p>
              <p className="text-[18px] font-bold text-txt-primary mt-0.5">₹{m.amount.toLocaleString('en-IN')}</p>
              <p className="text-[11px] text-txt-muted">{m.count} receipts</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-slate-50 flex items-center justify-between">
          <p className="text-[13px] font-semibold text-txt-primary">Receipt Register &mdash; {dateFrom} to {dateTo}</p>
          <p className="text-[12px] text-txt-muted">{filtered.length} entries</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border bg-slate-50">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide w-8">#</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide">Receipt No.</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide">Date</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide">Party</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide">Invoice Ref.</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide">Mode</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide">UTR / Ref</th>
                <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} className={`border-b border-border ${i % 2 === 1 ? 'bg-slate-50/40' : ''}`}>
                  <td className="px-4 py-2.5 text-txt-muted text-[12px]">{i + 1}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-primary">{r.id}</td>
                  <td className="px-4 py-2.5 text-txt-secondary">{r.date}</td>
                  <td className="px-4 py-2.5 font-medium text-txt-primary">{r.party}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-txt-muted">{r.against}</td>
                  <td className="px-4 py-2.5 text-txt-secondary">{r.mode}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-txt-secondary">{r.utr}</td>
                  <td className="px-4 py-2.5 font-bold text-txt-primary text-right">₹{r.amount.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-teal/10 border-t-2 border-teal/20">
                <td colSpan={7} className="px-4 py-3 font-bold text-teal text-[13px]">Grand Total</td>
                <td className="px-4 py-3 font-bold text-teal text-right text-[15px]">₹{total.toLocaleString('en-IN')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   TAB 3 — Credit & Debit Note
───────────────────────────────────────────── */
function CreditDebitNoteTab({ notes, setNotes }) {
  const [noteType, setNoteType] = useState('Credit')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ type: 'Credit', party: '', against: '', date: DEMO_TODAY, amount: '', reason: '', gstRate: '4.5' })
  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const filtered = notes.filter(n => n.type === noteType)
  const total    = filtered.reduce((s, n) => s + n.amount, 0)

  const handleSave = () => {
    if (!form.party || !form.amount) return
    const prefix = form.type === 'Credit' ? 'CN' : 'DN'
    const count  = notes.filter(n => n.type === form.type).length + 1
    const gst    = Math.round(parseFloat(form.amount) * parseFloat(form.gstRate)) / 100
    setNotes(n => [{
      id: `${prefix}-2024-${String(count).padStart(3, '0')}`,
      date: form.date, type: form.type, party: form.party,
      against: form.against || '-', amount: parseFloat(form.amount),
      reason: form.reason, status: 'Pending', gst,
    }, ...n])
    setShowModal(false)
    setForm({ type: noteType, party: '', against: '', date: DEMO_TODAY, amount: '', reason: '', gstRate: '4.5' })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-1 bg-white border border-border rounded-xl p-1 shadow-card">
          {['Credit', 'Debit'].map(t => (
            <button key={t} onClick={() => setNoteType(t)}
              className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all ${noteType === t ? 'bg-primary text-white shadow-sm' : 'text-txt-secondary hover:text-txt-primary'}`}>
              {t} Note
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => downloadCSV(['Note No.', 'Date', 'Party', 'Against', 'Amount', 'GST', 'Reason', 'Status'], ['id', 'date', 'party', 'against', 'amount', 'gst', 'reason', 'status'], filtered, `${noteType.toLowerCase()}_notes`)} className="btn-outline btn-sm"><Download size={13} />Export</button>
          <button onClick={() => { sf('type', noteType); setShowModal(true) }} className="btn-primary btn-sm"><Plus size={14} />New {noteType} Note</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-slate-50 flex items-center justify-between">
          <p className="text-[13px] font-semibold text-txt-primary">{noteType} Notes</p>
          <p className="text-[12px] text-txt-muted">{filtered.length} records</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border">
                {['Note No.', 'Date', 'Party', 'Against Invoice', 'Reason', 'Amount (₹)', 'GST (₹)', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-txt-secondary text-[11px] uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((n, i) => (
                <tr key={n.id} className={`border-b border-border hover:bg-slate-50/60 ${i % 2 === 1 ? 'bg-slate-50/30' : ''}`}>
                  <td className="px-4 py-3 font-mono text-[12px] text-primary font-semibold">{n.id}</td>
                  <td className="px-4 py-3 text-txt-secondary">{n.date}</td>
                  <td className="px-4 py-3 font-medium text-txt-primary">{n.party}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-txt-muted">{n.against}</td>
                  <td className="px-4 py-3 text-txt-secondary">{n.reason}</td>
                  <td className="px-4 py-3 font-bold text-txt-primary">₹{n.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-txt-secondary">₹{n.gst}</td>
                  <td className="px-4 py-3"><span className={`badge ${n.status === 'Approved' ? 'badge-success' : 'badge-warning'} text-[11px]`}>{n.status}</span></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-primary/5 border-t-2 border-primary/20">
                <td colSpan={5} className="px-4 py-3 font-semibold text-txt-primary">Total</td>
                <td className="px-4 py-3 font-bold text-primary">₹{total.toLocaleString('en-IN')}</td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-header">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText size={17} className="text-primary" />
            </div>
            <h3 className="text-[17px] font-semibold text-txt-primary">New {form.type} Note</h3>
          </div>
          <button onClick={() => setShowModal(false)} className="btn-icon"><X size={20} /></button>
        </div>
        <div className="modal-body space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="form-label">Type</label>
              <select className="form-select" value={form.type} onChange={e => sf('type', e.target.value)}>
                <option>Credit</option><option>Debit</option>
              </select>
            </div>
            <div>
              <label className="form-label">Date</label>
              <input type="date" className="form-input" value={form.date} onChange={e => sf('date', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Party Name *</label>
              <input className="form-input" placeholder="Customer / Vendor" value={form.party} onChange={e => sf('party', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Against Invoice / PO</label>
              <input className="form-input" placeholder="INV-2024-XXXX" value={form.against} onChange={e => sf('against', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Amount (₹) *</label>
              <input type="number" className="form-input" placeholder="0.00" value={form.amount} onChange={e => sf('amount', e.target.value)} />
            </div>
            <div>
              <label className="form-label">GST Rate</label>
              <select className="form-select" value={form.gstRate} onChange={e => sf('gstRate', e.target.value)}>
                {['0', '4.5', '9', '18'].map(r => <option key={r} value={r}>{r}%</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Reason</label>
              <input className="form-input" placeholder="e.g. Sales Return, Price Difference…" value={form.reason} onChange={e => sf('reason', e.target.value)} />
            </div>
          </div>
          {form.amount && (
            <div className="bg-slate-50 border border-border rounded-xl p-3 text-[13px] space-y-1">
              <div className="flex justify-between"><span className="text-txt-secondary">Note Value:</span><span className="font-semibold">₹{parseFloat(form.amount || 0).toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span className="text-txt-secondary">GST ({form.gstRate}%):</span><span className="font-semibold">₹{(parseFloat(form.amount || 0) * parseFloat(form.gstRate) / 100).toFixed(2)}</span></div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={() => setShowModal(false)} className="btn-outline">Cancel</button>
          <button onClick={handleSave} className="btn-primary"><CheckCircle size={14} />Create Note</button>
        </div>
      </Modal>
    </div>
  )
}

/* ─────────────────────────────────────────────
   TAB 4 — Trial Balance
───────────────────────────────────────────── */
function TrialBalanceTab() {
  const [dateFrom, setDateFrom] = useState('2024-04-01')
  const [dateTo, setDateTo]     = useState(DEMO_TODAY)

  const totalDr = trialBalanceData.reduce((s, r) => s + r.closingDr, 0)
  const totalCr = trialBalanceData.reduce((s, r) => s + r.closingCr, 0)
  const tallied = Math.abs(totalDr - totalCr) < 1

  return (
    <div className="space-y-4">
      <div className="bg-white border border-border rounded-xl p-4 shadow-card flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-[13px] font-medium text-txt-secondary">Period:</label>
          <input type="date" className="form-input py-2 text-[13px]" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          <span className="text-txt-muted text-[13px]">to</span>
          <input type="date" className="form-input py-2 text-[13px]" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
        <button onClick={() => downloadCSV(['Account', 'Group', 'Op.Dr', 'Op.Cr', 'Debit', 'Credit', 'Closing Dr', 'Closing Cr'], ['account', 'group', 'openingDr', 'openingCr', 'debit', 'credit', 'closingDr', 'closingCr'], trialBalanceData, 'trial_balance')} className="ml-auto btn-outline btn-sm"><Download size={13} />Export to Excel</button>
      </div>

      <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[12px] font-medium ${tallied ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
        {tallied ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
        {tallied ? 'Trial Balance is tallied — Total Dr equals Total Cr' : `Difference of ₹${Math.abs(totalDr - totalCr).toLocaleString('en-IN')} detected. Please review.`}
      </div>

      <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="text-left px-4 py-3 font-semibold text-[12px]" rowSpan={2}>Account Ledger</th>
                <th className="text-left px-4 py-3 font-semibold text-[12px]" rowSpan={2}>Group</th>
                <th className="text-center px-4 py-3 font-semibold text-[12px] border-l border-white/20" colSpan={2}>Opening Balance</th>
                <th className="text-center px-4 py-3 font-semibold text-[12px] border-l border-white/20" colSpan={2}>Transactions</th>
                <th className="text-center px-4 py-3 font-semibold text-[12px] border-l border-white/20" colSpan={2}>Closing Balance</th>
              </tr>
              <tr className="bg-slate-700 text-slate-300">
                <th className="text-right px-4 py-2 text-[11px] font-medium border-l border-white/10">Dr</th>
                <th className="text-right px-4 py-2 text-[11px] font-medium">Cr</th>
                <th className="text-right px-4 py-2 text-[11px] font-medium border-l border-white/10">Dr</th>
                <th className="text-right px-4 py-2 text-[11px] font-medium">Cr</th>
                <th className="text-right px-4 py-2 text-[11px] font-medium border-l border-white/10">Dr</th>
                <th className="text-right px-4 py-2 text-[11px] font-medium">Cr</th>
              </tr>
            </thead>
            <tbody>
              {trialBalanceData.map((row, i) => (
                <tr key={row.account} className={`border-b border-border hover:bg-blue-50/20 ${i % 2 === 1 ? 'bg-slate-50/40' : ''}`}>
                  <td className="px-4 py-2.5 font-medium text-txt-primary">{row.account}</td>
                  <td className="px-4 py-2.5 text-txt-secondary text-[12px]">{row.group}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-[12px] text-txt-secondary">{row.openingDr > 0 ? row.openingDr.toLocaleString('en-IN') : '—'}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-[12px] text-txt-secondary">{row.openingCr > 0 ? row.openingCr.toLocaleString('en-IN') : '—'}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-[12px] text-txt-secondary">{row.debit > 0 ? row.debit.toLocaleString('en-IN') : '—'}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-[12px] text-txt-secondary">{row.credit > 0 ? row.credit.toLocaleString('en-IN') : '—'}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-[12px] font-semibold text-txt-primary">{row.closingDr > 0 ? row.closingDr.toLocaleString('en-IN') : '—'}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-[12px] font-semibold text-txt-primary">{row.closingCr > 0 ? row.closingCr.toLocaleString('en-IN') : '—'}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-800 text-white">
                <td colSpan={6} className="px-4 py-3 font-bold text-[13px]">Grand Total</td>
                <td className="px-4 py-3 text-right font-bold font-mono">₹{totalDr.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-right font-bold font-mono">₹{totalCr.toLocaleString('en-IN')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   TAB 5 — Day-wise Outstanding
───────────────────────────────────────────── */
function DayWiseOutstandingTab() {
  const [partyType, setPartyType] = useState('All')
  const [asOnDate, setAsOnDate]   = useState(DEMO_TODAY)

  const filtered = outstandingData.filter(o => partyType === 'All' || o.type === partyType)
  const totals = {
    '0-30':  filtered.reduce((s, o) => s + o['0-30'], 0),
    '31-60': filtered.reduce((s, o) => s + o['31-60'], 0),
    '61-90': filtered.reduce((s, o) => s + o['61-90'], 0),
    '90+':   filtered.reduce((s, o) => s + o['90+'], 0),
    total:   filtered.reduce((s, o) => s + o.total, 0),
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-border rounded-xl p-4 shadow-card flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-[13px] font-medium text-txt-secondary">As on:</label>
          <input type="date" className="form-input py-2 text-[13px]" value={asOnDate} onChange={e => setAsOnDate(e.target.value)} />
        </div>
        <div className="flex gap-1">
          {['All', 'Customer', 'Vendor'].map(t => (
            <button key={t} onClick={() => setPartyType(t)}
              className={`px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all ${partyType === t ? 'bg-primary text-white' : 'bg-slate-50 border border-border text-txt-secondary hover:bg-slate-100'}`}>
              {t}
            </button>
          ))}
        </div>
        <button onClick={() => downloadCSV(['Party', 'Type', '0-30 Days', '31-60 Days', '61-90 Days', '90+ Days', 'Total'], ['party', 'type', '0-30', '31-60', '61-90', '90+', 'total'], filtered, 'outstanding_ageing')} className="ml-auto btn-outline btn-sm"><Download size={13} />Export</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: '0–30 Days (Current)', val: totals['0-30'], color: 'text-green-700' },
          { label: '31–60 Days',          val: totals['31-60'], color: 'text-amber-600' },
          { label: '61–90 Days',          val: totals['61-90'], color: 'text-orange-600' },
          { label: 'Over 90 Days',        val: totals['90+'],  color: 'text-danger' },
        ].map(item => (
          <div key={item.label} className="bg-white border border-border rounded-xl p-3 shadow-card">
            <p className="text-[11px] text-txt-muted uppercase tracking-wide font-medium leading-tight">{item.label}</p>
            <p className={`text-[20px] font-bold mt-1 ${item.color}`}>₹{item.val.toLocaleString('en-IN')}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide">Party Name</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-txt-secondary uppercase tracking-wide">Type</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-green-700 uppercase tracking-wide">0–30 Days</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-amber-600 uppercase tracking-wide">31–60 Days</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-orange-600 uppercase tracking-wide">61–90 Days</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-danger uppercase tracking-wide">90+ Days</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-txt-primary uppercase tracking-wide">Total Due</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr key={o.party} className={`border-b border-border hover:bg-slate-50/60 ${i % 2 === 1 ? 'bg-slate-50/30' : ''}`}>
                  <td className="px-4 py-3 font-medium text-txt-primary">{o.party}</td>
                  <td className="px-4 py-3"><span className={`badge ${o.type === 'Customer' ? 'badge-info' : 'badge-gray'} text-[11px]`}>{o.type}</span></td>
                  <td className="px-4 py-3 text-right font-mono text-[12px] text-green-700">{o['0-30'] > 0 ? `₹${o['0-30'].toLocaleString('en-IN')}` : '—'}</td>
                  <td className="px-4 py-3 text-right font-mono text-[12px] text-amber-600">{o['31-60'] > 0 ? `₹${o['31-60'].toLocaleString('en-IN')}` : '—'}</td>
                  <td className="px-4 py-3 text-right font-mono text-[12px] text-orange-600">{o['61-90'] > 0 ? `₹${o['61-90'].toLocaleString('en-IN')}` : '—'}</td>
                  <td className="px-4 py-3 text-right font-mono text-[12px] text-danger">{o['90+'] > 0 ? `₹${o['90+'].toLocaleString('en-IN')}` : '—'}</td>
                  <td className="px-4 py-3 text-right font-bold text-txt-primary">₹{o.total.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-primary/5 border-t-2 border-primary/20">
                <td colSpan={2} className="px-4 py-3 font-bold text-txt-primary">Grand Total — {filtered.length} parties</td>
                <td className="px-4 py-3 text-right font-bold text-green-700">₹{totals['0-30'].toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-right font-bold text-amber-600">₹{totals['31-60'].toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-right font-bold text-orange-600">₹{totals['61-90'].toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-right font-bold text-danger">₹{totals['90+'].toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-right font-bold text-primary text-[15px]">₹{totals.total.toLocaleString('en-IN')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const TABS = ['Payment Receipt', 'Receipt Register', 'Credit & Debit Note', 'Trial Balance', 'Day-wise Outstanding']

export default function Accounts() {
  const [tab, setTab]         = useState('Payment Receipt')
  const [receipts, setReceipts] = useState(initialReceipts)
  const [notes, setNotes]     = useState(initialNotes)

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">Accounts</h1>
          <p className="text-[13px] text-txt-muted mt-0.5">Payment tracking, receipts &amp; financial statements</p>
        </div>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto bg-white border border-border rounded-xl p-1 shadow-card w-full">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3.5 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all duration-200 ${tab === t ? 'bg-primary text-white shadow-sm' : 'text-txt-secondary hover:text-txt-primary'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Payment Receipt'      && <PaymentReceiptTab receipts={receipts} setReceipts={setReceipts} />}
      {tab === 'Receipt Register'     && <ReceiptRegisterTab receipts={receipts} />}
      {tab === 'Credit & Debit Note'  && <CreditDebitNoteTab notes={notes} setNotes={setNotes} />}
      {tab === 'Trial Balance'        && <TrialBalanceTab />}
      {tab === 'Day-wise Outstanding' && <DayWiseOutstandingTab />}
    </div>
  )
}
