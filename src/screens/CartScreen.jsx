import React, { useState } from 'react'
import './CartScreen.css'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'

const DELIVERY_FEE = 40
const DISCOUNT = 60

export default function CartScreen({ cartItems, setCartItems, onBack, onCheckout }) {
  const { t } = useLanguage()
  const [selectedIds, setSelectedIds] = useState(cartItems.map((i) => i.id))
  const allSelected = selectedIds.length === cartItems.length && cartItems.length > 0

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([])
    } else {
      setSelectedIds(cartItems.map((i) => i.id))
    }
  }

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    )
  }

  const deleteItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    setSelectedIds((prev) => prev.filter((x) => x !== id))
  }

  const selectedItems = cartItems.filter((i) => selectedIds.includes(i.id))
  const subtotal = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0)
  const total = Math.max(0, subtotal + DELIVERY_FEE - (subtotal > 0 ? DISCOUNT : 0))

  return (
    <div className="screen screen--white">
      {/* Top bar */}
      <div className="detail-topbar">
        <button className="icon-btn" onClick={onBack} aria-label={t("back")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="detail-topbar__title">{t("cart")}</h1>
        <button className="icon-btn" aria-label={t("moreOptions")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="12" cy="19" r="1.6" />
          </svg>
        </button>
      </div>

      <div className="detail-scroll">
        {cartItems.length === 0 ? (
          <div className="empty-state empty-state--large">
            <span className="empty-state__icon empty-state__icon--big">🛒</span>
            <h3 className="empty-state__title">{t("emptyCart")}</h3>
            <p className="empty-state__sub">{t("addDishStart")}</p>
            <button className="btn btn--primary" onClick={onBack}>
              {t("browseMenu")}
            </button>
          </div>
        ) : (
          <>
            {/* Items count + Select all */}
            <div className="cart-header-row">
              <span className="cart-count">{cartItems.length} {t("items")}</span>
              <button className="cart-select-all" onClick={toggleSelectAll}>
                <span className={`cart-checkbox${allSelected ? ' cart-checkbox--checked' : ''}`}>
                  {allSelected && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </span>
                {t("selectAll")}
              </button>
            </div>

            {/* Cart items */}
            <div className="cart-list">
              {cartItems.map((item) => {
                const isSelected = selectedIds.includes(item.id)
                return (
                  <div key={item.id} className="cart-item">
                    <button
                      className="cart-checkbox"
                      onClick={() => toggleSelect(item.id)}
                      aria-label="Select item"
                    >
                      {isSelected && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </button>

                    <img src={item.image} alt={item.name} className="cart-item__thumb" />

                    <div className="cart-item__body">
                      <div className="cart-item__top-row">
                        <div>
                          <h3 className="cart-item__name">{item.name}</h3>
                          <p className="cart-item__portion">{item.portion}</p>
                        </div>
                        <button
                          className="cart-item__delete"
                          onClick={() => deleteItem(item.id)}
                          aria-label={t("remove")}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                      <div className="cart-item__bottom-row">
                        <span className="cart-item__price">{(item.price * item.qty).toLocaleString()} ETB</span>
                        <QuantityStepper
                          value={item.qty}
                          onDecrement={() => updateQty(item.id, -1)}
                          onIncrement={() => updateQty(item.id, 1)}
                          min={1}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary */}
            <div className="habesha-divider" style={{ margin: '20px 0' }} />
            <div className="cart-summary">
              <h3 className="cart-summary__title">{t("orderSummary")}</h3>
              <div className="summary-row">
                <span>{t("subtotal")}</span>
                <span>{subtotal.toLocaleString()} ETB</span>
              </div>
              <div className="summary-row">
                <span>{t("deliveryFee")}</span>
                <span>{DELIVERY_FEE} ETB</span>
              </div>
              <div className="summary-row summary-row--discount">
                <span>{t("discount")}</span>
                <span>-{subtotal > 0 ? DISCOUNT : 0} ETB</span>
              </div>
              <div className="habesha-divider" style={{ margin: '14px 0' }} />
              <div className="summary-row summary-row--total">
                <span>{t("total")}</span>
                <span>{total.toLocaleString()} ETB</span>
              </div>
            </div>

            <div style={{ height: 110 }} />
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="detail-sticky">
          <div className="detail-sticky__total">
            <span className="detail-sticky__total-label">{t("total")}</span>
            <span className="detail-sticky__total-price">{total.toLocaleString()} ETB</span>
          </div>
          <button className="detail-sticky__add-btn" onClick={onCheckout}>
            {t("checkout")}
          </button>
        </div>
      )}
    </div>
  )
}
