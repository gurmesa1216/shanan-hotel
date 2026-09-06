import React, { useState, useEffect } from 'react'
import './BottomNav.css'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function BottomNav({
  activeScreen,
  onNavigate,
  cartCount
}) {
  const { t } = useLanguage()
  const [showSavedModal, setShowSavedModal] = useState(false)
  const [savedDishes, setSavedDishes] = useState([])

  // Load saved items from localStorage when modal opens
  useEffect(() => {
    if (showSavedModal) {
      const stored = JSON.parse(localStorage.getItem('favoriteDishes') || '[]')
      setSavedDishes(stored)
    }
  }, [showSavedModal])

  const removeSavedItem = (id) => {
    const updated = savedDishes.filter((dish) => dish.id !== id)
    setSavedDishes(updated)
    localStorage.setItem('favoriteDishes', JSON.stringify(updated))
  }

  const tabs = [
    {
      id: 'home',
      label: t('home'),
      icon: HomeIcon
    },
    {
      id: 'menu',
      label: t('menu'),
      icon: MenuIcon
    },
    {
      id: 'favorites',
      label: t('saved'),
      icon: HeartIcon
    },
    {
      id: 'cart',
      label: t('cart'),
      icon: CartIcon,
      badge: cartCount
    },
    {
      id: 'profile',
      label: t('profile'),
      icon: ProfileIcon
    }
  ]

  const handleTabClick = (tabId) => {
    if (tabId === 'favorites') {
      setShowSavedModal(true)
    } else {
      onNavigate(tabId)
    }
  }

  return (
    <>
      <nav className="bottom-nav">
        <div className="bottom-nav__inner">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = activeScreen === tab.id

            return (
              <button
                key={tab.id}
                className={`bottom-nav__tab ${
                  active ? 'bottom-nav__tab--active' : ''
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                <span className="bottom-nav__icon-wrap">
                  <Icon />
                  {tab.badge > 0 && (
                    <span className="bottom-nav__badge">{tab.badge}</span>
                  )}
                </span>
                <span className="bottom-nav__label">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Saved / Favorites Modal Overlay */}
      {showSavedModal && (
        <div className="saved-modal-overlay" onClick={() => setShowSavedModal(false)}>
          <div className="saved-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="saved-modal-header">
              <h2>❤️ {t('saved') || 'Saved Items'}</h2>
              <button className="saved-close-btn" onClick={() => setShowSavedModal(false)}>
                ✕
              </button>
            </div>

            <div className="saved-modal-body">
              {savedDishes.length === 0 ? (
                <div className="saved-empty-state">
                  <p>No saved dishes yet.</p>
                  <span>Tap heart icons on menu items to save them here!</span>
                </div>
              ) : (
                <div className="saved-list">
                  {savedDishes.map((dish) => (
                    <div key={dish.id} className="saved-item-card">
                      {dish.image && <img src={dish.image} alt={dish.name} />}
                      <div className="saved-item-info">
                        <h4>{dish.name}</h4>
                        <p>{dish.price} ETB</p>
                      </div>
                      <button
                        className="saved-remove-btn"
                        onClick={() => removeSavedItem(dish.id)}
                      >
                        🗑
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 0 0 1.06-8.84z" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}