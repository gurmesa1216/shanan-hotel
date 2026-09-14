import React, { useState } from 'react'
import './AdminLayout.css'

// SVG Icons to replace emojis
const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
)

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    <circle cx="12" cy="5" r="1" />
  </svg>
)

const CrownIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
  </svg>
)

const HamburgerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const ExitIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />
  },
  {
    id: 'menu',
    label: 'Menu',
    icon: <MenuIcon />
  }
]

export default function AdminLayout({
  connected,
  onExit,
  children,
  activePage,
  onNavigate
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="admin-layout">
      {sidebarOpen && (
        <div 
          className="admin-sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__header">
          <div className="admin-sidebar__logo">
            <CrownIcon />
          </div>
          <div>
            <h2 className="admin-sidebar__title">Habesha Bites</h2>
            <p className="admin-sidebar__subtitle">Admin Panel</p>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={
                activePage === item.id
                  ? 'admin-nav-item admin-nav-item--active'
                  : 'admin-nav-item'
              }
              onClick={() => {
                onNavigate(item.id)
                setSidebarOpen(false)
              }}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__conn">
            <span className={`admin-conn-dot ${connected ? 'admin-conn-dot--on' : ''}`} />
            <span>
              {connected ? 'MySQL Connected' : 'Offline'}
            </span>
          </div>

          <button className="admin-sidebar__exit" onClick={onExit}>
            <ExitIcon />
            <span>Exit App</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-main__header">
          <button
            className="admin-mobile-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation menu"
          >
            <HamburgerIcon />
          </button>

          <h1 className="admin-main__title">
            {NAV_ITEMS.find((n) => n.id === activePage)?.label}
          </h1>
        </header>

        <div className="admin-main__content">{children}</div>
      </div>
    </div>
  )
}