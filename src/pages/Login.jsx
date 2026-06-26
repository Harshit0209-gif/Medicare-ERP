import { useState } from 'react'
import { Eye, EyeOff, Shield, User, LogIn, AlertCircle, CheckCircle } from 'lucide-react'

const DEMO_ACCOUNTS = {
  admin: { email: 'admin@medicare-erp.com', password: 'admin123', name: 'Dr. Harsh Agarwal', role: 'Administrator', avatar: 'HA' },
  user:  { email: 'user@medicare-erp.com',  password: 'user123',  name: 'Priya Sharma',      role: 'Staff',         avatar: 'PS' },
}


export default function Login({ onLogin }) {
  const [role, setRole]         = useState('admin')
  const [email, setEmail]       = useState(DEMO_ACCOUNTS.admin.email)
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const switchRole = (r) => {
    setRole(r)
    setEmail(DEMO_ACCOUNTS[r].email)
    setPassword('')
    setError('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    const account = DEMO_ACCOUNTS[role]
    if (!email.trim() || !password.trim()) { setError('Please enter your email and password.'); return }
    if (email !== account.email || password !== account.password) { setError('Incorrect credentials. Use the demo credentials shown below.'); return }
    setLoading(true)
    setTimeout(() => onLogin({ ...account }), 900)
  }

  const fillDemo = () => { setEmail(DEMO_ACCOUNTS[role].email); setPassword(DEMO_ACCOUNTS[role].password); setError('') }

  const features = [
    'Real-time stock tracking & low-stock alerts',
    'Invoice management with GST compliance',
    'Expiry monitoring & supplier management',
  ]

  return (
    <div className="min-h-screen bg-app flex font-sans">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[460px] flex-shrink-0 bg-sidebar p-10 relative overflow-hidden">
        <div className="absolute -top-28 -left-28 w-[380px] h-[380px] rounded-full bg-primary/10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-teal/8 pointer-events-none translate-x-1/3 translate-y-1/3" />

        {/* Top logo */}
        <div className="relative z-10">
          <p className="text-white font-semibold text-[17px] tracking-tight">Medicare ERP</p>
          <p className="text-slate-500 text-[12px]">Medical Inventory System</p>
        </div>

        {/* Center copy */}
        <div className="relative z-10 space-y-5">
          <h2 className="text-[38px] font-bold text-white leading-[1.15] tracking-tight">
            Manage your<br />
            <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
              medical inventory
            </span><br />
            with confidence.
          </h2>
          <p className="text-slate-400 text-[14px] leading-relaxed max-w-[300px]">
            A premium ERP solution for pharmacies, hospitals, and medical distributors — built for clarity and speed.
          </p>
          <div className="space-y-3 pt-1">
            {features.map(f => (
              <div key={f} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle size={11} className="text-green-400" />
                </div>
                <p className="text-slate-400 text-[13px] leading-snug">{f}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-slate-700 text-[11px]">© 2024 Medicare ERP · All rights reserved</p>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#F8FAFC]">
        <div className="w-full max-w-[400px] animate-fadeIn">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <p className="text-txt-primary font-bold text-[17px] tracking-tight">Medicare ERP</p>
          </div>

          <div className="mb-7">
            <h1 className="text-[26px] font-bold text-txt-primary tracking-tight">Welcome back</h1>
            <p className="text-txt-secondary text-[13px] mt-1">Select your role and sign in to continue</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { key: 'admin', label: 'Admin Login',  icon: Shield, desc: 'Full system access' },
              { key: 'user',  label: 'Staff Login',  icon: User,   desc: 'Day-to-day operations' },
            ].map(({ key, label, icon: Icon, desc }) => (
              <button
                key={key}
                onClick={() => switchRole(key)}
                className={[
                  'flex flex-col items-start gap-1.5 p-4 rounded-[14px] border-2 text-left transition-all duration-250',
                  role === key
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border bg-white hover:border-primary/30 hover:shadow-sm',
                ].join(' ')}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${role === key ? 'bg-primary' : 'bg-slate-100'}`}>
                  <Icon size={17} className={role === key ? 'text-white' : 'text-txt-secondary'} strokeWidth={2} />
                </div>
                <div>
                  <p className={`text-[13px] font-semibold ${role === key ? 'text-primary' : 'text-txt-primary'}`}>{label}</p>
                  <p className="text-[11px] text-txt-muted leading-snug">{desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="form-label mb-0">Password</label>
                <button type="button" className="text-[12px] text-primary hover:underline font-medium">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  className="form-input pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-muted hover:text-txt-secondary transition-colors"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 p-3 bg-red-50 border border-red-200 rounded-btn animate-fadeIn">
                <AlertCircle size={15} className="text-danger flex-shrink-0" />
                <p className="text-[13px] text-danger">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-2.5 text-[14px] mt-1 rounded-[10px]"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : <LogIn size={16} />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-5 p-4 bg-white border border-border rounded-[14px] shadow-card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold text-txt-muted uppercase tracking-widest">
                Demo · {role === 'admin' ? 'Admin' : 'Staff'}
              </p>
              <button type="button" onClick={fillDemo} className="text-[12px] text-primary font-semibold hover:underline">
                Auto-fill ↗
              </button>
            </div>
            <div className="space-y-2">
              {[['Email', DEMO_ACCOUNTS[role].email], ['Password', DEMO_ACCOUNTS[role].password]].map(([label, val]) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-[11px] text-txt-muted w-14 flex-shrink-0">{label}</span>
                  <code className="text-[12px] font-medium text-txt-primary bg-slate-50 border border-border px-2.5 py-1 rounded-lg select-all flex-1 truncate">
                    {val}
                  </code>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-[11px] text-txt-muted mt-5 leading-relaxed">
            Demo application — no real data is stored or transmitted.
          </p>
        </div>
      </div>
    </div>
  )
}
