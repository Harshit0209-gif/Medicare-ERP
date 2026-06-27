import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Layout from './components/Layout/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Sales from './pages/Sales'
import Suppliers from './pages/Suppliers'
import Accounts from './pages/Accounts'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import SplashScreen from './components/SplashScreen'

export default function App() {
  const [splash, setSplash] = useState(true)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('gobt_user')) } catch { return null }
  })

  const handleLogin = (userData) => {
    sessionStorage.setItem('gobt_user', JSON.stringify(userData))
    setUser(userData)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('gobt_user')
    setUser(null)
  }

  if (splash) return <SplashScreen onDone={() => setSplash(false)} />

  if (!user) return <Login onLogin={handleLogin} />

  return (
    <AuthContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard"  element={<Dashboard />} />
            <Route path="inventory"  element={<Inventory />} />
            <Route path="sales"      element={<Sales />} />
            <Route path="suppliers"  element={<Suppliers />} />
            <Route path="accounts"   element={<Accounts />} />
            <Route path="reports"    element={<Reports />} />
            <Route path="settings"   element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
