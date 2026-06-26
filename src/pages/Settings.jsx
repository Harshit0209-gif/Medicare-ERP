import { useState } from 'react'
import {
  User, Bell, Shield, Database, Building2, Palette,
  Mail, Phone, MapPin, Edit2, Save, X, Plus, Trash2,
  CheckCircle, Eye, EyeOff, ToggleLeft, ToggleRight,
} from 'lucide-react'
import { users as initialUsers } from '../data/mockData'

const TABS = ['Profile', 'Users', 'Notifications', 'System']

const roleColors = {
  Admin: 'badge-danger',
  Pharmacist: 'badge-success',
  'Store Manager': 'badge-info',
  'Sales Executive': 'badge-purple',
  Accountant: 'badge-warning',
}

function Toggle({ enabled, onChange }) {
  return (
    <button onClick={() => onChange(!enabled)} className={`relative inline-flex w-10 h-6 rounded-full transition-colors duration-300 ${enabled ? 'bg-primary' : 'bg-slate-200'}`}>
      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${enabled ? 'translate-x-4' : ''}`} />
    </button>
  )
}

export default function Settings() {
  const [tab, setTab] = useState('Profile')
  const [users, setUsers] = useState(initialUsers)
  const [profile, setProfile] = useState({
    name: 'Dr. Harsh Agarwal',
    email: 'harsh@medicare-erp.com',
    phone: '+91 98765 43210',
    role: 'Administrator',
    department: 'Management',
    address: 'Mumbai, Maharashtra',
  })
  const [org, setOrg] = useState({
    name: 'Medicare ERP',
    gst: '27AABCM1234A1ZP',
    license: 'DL-MH-2024-00821',
    address: 'Plot 14, BKC, Mumbai, MH 400051',
    phone: '+91 22 4567 8900',
    email: 'admin@medicare-erp.com',
  })
  const [notif, setNotif] = useState({
    lowStock: true, expiry: true, newSale: false,
    newPO: true, payments: true, systemAlerts: true,
    emailAlerts: true, smsAlerts: false,
  })
  const [system, setSystem] = useState({
    currency: 'INR (₹)', timezone: 'Asia/Kolkata (IST)',
    dateFormat: 'DD/MM/YYYY', language: 'English',
    taxRate: '5', lowStockThreshold: '100',
    autoBackup: true, darkMode: false,
  })
  const [editProfile, setEditProfile] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const notifItems = [
    { key: 'lowStock', label: 'Low Stock Alerts', desc: 'Notify when product stock falls below minimum' },
    { key: 'expiry', label: 'Expiry Warnings', desc: 'Alert for medicines expiring within 90 days' },
    { key: 'newSale', label: 'New Sale Notifications', desc: 'Get notified when a new invoice is created' },
    { key: 'newPO', label: 'Purchase Order Updates', desc: 'Notify on PO status changes' },
    { key: 'payments', label: 'Payment Reminders', desc: 'Alerts for overdue and pending payments' },
    { key: 'systemAlerts', label: 'System Alerts', desc: 'Critical system messages and errors' },
    { key: 'emailAlerts', label: 'Email Notifications', desc: 'Receive alerts via email' },
    { key: 'smsAlerts', label: 'SMS Notifications', desc: 'Receive critical alerts via SMS' },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="text-[13px] text-txt-muted">Manage your account, users, and system preferences</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-border rounded-card p-1 w-fit shadow-card">
        {[
          { name: 'Profile', icon: User },
          { name: 'Users', icon: Shield },
          { name: 'Notifications', icon: Bell },
          { name: 'System', icon: Database },
        ].map(({ name, icon: Icon }) => (
          <button key={name} onClick={() => setTab(name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-btn text-[14px] font-medium transition-all duration-200 ${tab === name ? 'bg-primary text-white shadow-sm' : 'text-txt-secondary hover:text-txt-primary'}`}>
            <Icon size={15} />{name}
          </button>
        ))}
      </div>

      {tab === 'Profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar card */}
          <div className="card p-6 text-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-teal mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-card-hover">
              HA
            </div>
            <p className="text-[18px] font-bold text-txt-primary">{profile.name}</p>
            <p className="text-[13px] text-txt-muted mb-1">{profile.role}</p>
            <span className="badge badge-danger">Administrator</span>
            <div className="mt-6 pt-5 border-t border-border space-y-2.5">
              {[[Mail, profile.email], [Phone, profile.phone], [MapPin, profile.address]].map(([Icon, val], i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-txt-secondary">
                  <Icon size={14} className="text-txt-muted flex-shrink-0" />
                  <span className="truncate">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Edit profile */}
          <div className="card p-6 lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="section-title">Personal Information</h2>
              <button onClick={() => setEditProfile(e => !e)} className={editProfile ? 'btn-outline btn-sm' : 'btn-primary btn-sm'}>
                {editProfile ? <><X size={14} />Cancel</> : <><Edit2 size={14} />Edit Profile</>}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Full Name', key: 'name', placeholder: 'Your full name' },
                { label: 'Email', key: 'email', placeholder: 'your@email.com' },
                { label: 'Phone', key: 'phone', placeholder: '+91 XXXXX XXXXX' },
                { label: 'Department', key: 'department', placeholder: 'Department' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="form-label">{label}</label>
                  {editProfile
                    ? <input className="form-input" value={profile[key]} onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} />
                    : <p className="px-3 py-2.5 bg-app rounded-inp border border-border text-[14px] text-txt-primary">{profile[key]}</p>
                  }
                </div>
              ))}
              <div className="col-span-2">
                <label className="form-label">Address</label>
                {editProfile
                  ? <input className="form-input" value={profile.address} onChange={e => setProfile(p => ({ ...p, address: e.target.value }))} />
                  : <p className="px-3 py-2.5 bg-app rounded-inp border border-border text-[14px] text-txt-primary">{profile.address}</p>
                }
              </div>
            </div>
            {editProfile && (
              <div className="flex justify-end gap-3">
                <button onClick={() => setEditProfile(false)} className="btn-outline">Cancel</button>
                <button onClick={() => setEditProfile(false)} className="btn-primary"><Save size={15} />Save Changes</button>
              </div>
            )}

            {/* Change password */}
            <div className="border-t border-border pt-5">
              <h3 className="text-[16px] font-semibold text-txt-primary mb-4">Change Password</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Current Password</label>
                  <div className="relative">
                    <input type={showPwd ? 'text' : 'password'} className="form-input pr-10" placeholder="Enter current password" />
                    <button onClick={() => setShowPwd(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-muted hover:text-txt-secondary">
                      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-input" placeholder="Enter new password" />
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <button className="btn-primary btn-sm"><Shield size={14} />Update Password</button>
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="card p-6 lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Building2 size={20} className="text-primary" />
              <h2 className="section-title">Organization Details</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Organization Name', key: 'name' },
                { label: 'GST Number', key: 'gst' },
                { label: 'Drug License No.', key: 'license' },
                { label: 'Phone', key: 'phone' },
                { label: 'Email', key: 'email' },
                { label: 'Address', key: 'address' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="form-label">{label}</label>
                  <input className="form-input" value={org[key]} onChange={e => setOrg(o => ({ ...o, [key]: e.target.value }))} />
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button className="btn-primary btn-sm"><Save size={14} />Save Organization</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'Users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[14px] text-txt-secondary">{users.length} users registered</p>
            <button className="btn-primary btn-sm"><Plus size={15} />Add User</button>
          </div>
          <div className="card overflow-hidden">
            <table className="data-table w-full border-collapse">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Last Login</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id} className="animate-fadeIn" style={{ animationDelay: `${i * 40}ms` }}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-teal flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
                          {u.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-txt-primary">{u.name}</p>
                          <p className="text-[11px] text-txt-muted">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className={`badge ${roleColors[u.role] || 'badge-gray'}`}>{u.role}</span></td>
                    <td className="text-txt-secondary text-[13px]">{u.department}</td>
                    <td className="text-txt-secondary text-[13px]">{u.lastLogin}</td>
                    <td>
                      <span className={`badge ${u.status === 'Active' ? 'badge-success' : 'badge-gray'}`}>
                        {u.status === 'Active' ? <CheckCircle size={12} /> : null}
                        {u.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <button className="btn-icon"><Edit2 size={15} /></button>
                        <button className="btn-icon text-danger hover:bg-red-50" onClick={() => setUsers(arr => arr.filter(x => x.id !== u.id))}>
                          <Trash2 size={15} />
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

      {tab === 'Notifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {notifItems.map(({ key, label, desc }) => (
            <div key={key} className="card p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[14px] font-semibold text-txt-primary">{label}</p>
                <p className="text-[12px] text-txt-muted mt-0.5">{desc}</p>
              </div>
              <Toggle enabled={notif[key]} onChange={v => setNotif(n => ({ ...n, [key]: v }))} />
            </div>
          ))}
        </div>
      )}

      {tab === 'System' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6 space-y-4">
            <h2 className="section-title">General Settings</h2>
            {[
              { label: 'Currency', key: 'currency', options: ['INR (₹)', 'USD ($)', 'EUR (€)'] },
              { label: 'Timezone', key: 'timezone', options: ['Asia/Kolkata (IST)', 'UTC', 'Asia/Dubai'] },
              { label: 'Date Format', key: 'dateFormat', options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'] },
              { label: 'Language', key: 'language', options: ['English', 'Hindi', 'Marathi'] },
            ].map(({ label, key, options }) => (
              <div key={key}>
                <label className="form-label">{label}</label>
                <select className="form-select" value={system[key]} onChange={e => setSystem(s => ({ ...s, [key]: e.target.value }))}>
                  {options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>

          <div className="card p-6 space-y-4">
            <h2 className="section-title">Inventory Settings</h2>
            <div>
              <label className="form-label">Default Tax Rate (%)</label>
              <input type="number" className="form-input" value={system.taxRate} onChange={e => setSystem(s => ({ ...s, taxRate: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">Low Stock Threshold (units)</label>
              <input type="number" className="form-input" value={system.lowStockThreshold} onChange={e => setSystem(s => ({ ...s, lowStockThreshold: e.target.value }))} />
            </div>
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-txt-primary">Auto Backup</p>
                  <p className="text-[12px] text-txt-muted">Daily automatic data backup</p>
                </div>
                <Toggle enabled={system.autoBackup} onChange={v => setSystem(s => ({ ...s, autoBackup: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-txt-primary">Dark Mode</p>
                  <p className="text-[12px] text-txt-muted">Enable dark theme (coming soon)</p>
                </div>
                <Toggle enabled={system.darkMode} onChange={v => setSystem(s => ({ ...s, darkMode: v }))} />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button className="btn-primary btn-sm"><Save size={14} />Save Settings</button>
            </div>
          </div>

          <div className="card p-6 lg:col-span-2">
            <h2 className="section-title mb-4">Danger Zone</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Clear All Sales Data', desc: 'Permanently delete all sales records', danger: true },
                { label: 'Reset Inventory', desc: 'Reset all stock quantities to zero', danger: true },
                { label: 'Factory Reset', desc: 'Wipe all data and restore defaults', danger: true },
              ].map(({ label, desc }) => (
                <div key={label} className="border border-danger/30 rounded-xl p-4 bg-red-50/50">
                  <p className="text-[14px] font-semibold text-danger">{label}</p>
                  <p className="text-[12px] text-txt-muted mt-1 mb-3">{desc}</p>
                  <button className="btn-danger btn-sm w-full">Proceed</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
