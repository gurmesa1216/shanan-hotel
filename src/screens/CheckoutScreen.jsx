import React, { useState } from 'react'
import './CheckoutScreen.css'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const DELIVERY_FEE = 40
const DISCOUNT = 60

export default function CheckoutScreen({ cartItems, onBack, onPlaceOrder }) {
  const { t } = useLanguage()
  const [address, setAddress] = useState({
    label: 'Home',
    line: 'Bole Road, Atlas Area, Building 14',
    city: 'Addis Ababa',
  })
  const [editingAddress, setEditingAddress] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [summaryOpen, setSummaryOpen] = useState(false)

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)
  const total = Math.max(0, subtotal + DELIVERY_FEE - (subtotal > 0 ? DISCOUNT : 0))

  const paymentMethods = [
    { id: 'cash', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
    { id: 'telebirr', label: 'Telebirr', icon: '📱', desc: 'Pay via Telebirr mobile' },
    { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, Amex' },
  ]

  return (
    <div className="screen screen--white">
      {/* Top bar */}
      <div className="detail-topbar">
        <button className="icon-btn" onClick={onBack} aria-label={t("back")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="detail-topbar__title">{t("checkout")}</h1>
        <div style={{ width: 38 }} />
      </div>

      <div className="detail-scroll">
        {/* Delivery address */}
        <section className="checkout-section">
          <h3 className="checkout-section__title">{t("deliveryAddress")}</h3>
          <div className="address-card">
            <div className="address-card__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0B6B3A">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            {editingAddress ? (
              <div className="address-card__edit">
                <input
                  className="address-input"
                  value={address.label}
                  onChange={(e) => setAddress({ ...address, label: e.target.value })}
                  placeholder={t("addressLabel")}
                />
                <input
                  className="address-input"
                  value={address.line}
                  onChange={(e) => setAddress({ ...address, line: e.target.value })}
                  placeholder={t("streetAddress")}
                />
                <input
                  className="address-input"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder={t("city")}
                />
                <button
                  className="btn btn--primary btn--sm"
                  onClick={() => setEditingAddress(false)}
                >
                  {t("saveAddress")}
                </button>
              </div>
            ) : (
              <div className="address-card__info">
                <span className="address-card__label">{address.label}</span>
                <p className="address-card__line">{address.line}</p>
                <p className="address-card__city">{address.city}</p>
                <button
                  className="address-card__edit-btn"
                  onClick={() => setEditingAddress(true)}
                >
                  {t("edit")}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Payment method */}
        <section className="checkout-section">
          <h3 className="checkout-section__title">{t("paymentMethod")}</h3>
          <div className="payment-list">
            {paymentMethods.map((m) => (
              <button
                key={m.id}
                className={`payment-option${paymentMethod === m.id ? ' payment-option--active' : ''}`}
                onClick={() => setPaymentMethod(m.id)}
              >
                <span className="payment-option__icon">{m.icon}</span>
                <div className="payment-option__info">
                  <span className="payment-option__label">{m.label}</span>
                  <span className="payment-option__desc">{m.desc}</span>
                </div>
                <span className={`payment-option__radio${paymentMethod === m.id ? ' payment-option__radio--checked' : ''}`} />
              </button>
            ))}
          </div>
        </section>

        {/* Order summary (collapsible) */}
        <section className="checkout-section">
          <button
            className="checkout-section__header"
            onClick={() => setSummaryOpen(!summaryOpen)}
          >
            <h3 className="checkout-section__title">Order Summary</h3>
            <div className="checkout-summary-toggle">
              <span className="checkout-summary-total">{total.toLocaleString()} ETB</span>
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                style={{ transform: summaryOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </button>

          {summaryOpen && (
            <div className="cart-summary">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-row">
                  <span>{item.name} × {item.qty}</span>
                  <span>{(item.price * item.qty).toLocaleString()} ETB</span>
                </div>
              ))}
              <div className="habesha-divider" style={{ margin: '14px 0' }} />
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
          )}
        </section>

        <div style={{ height: 110 }} />
      </div>

      {/* Sticky Place Order */}
      <div className="detail-sticky">
        <div className="detail-sticky__total">
          <span className="detail-sticky__total-label">Total</span>
          <span className="detail-sticky__total-price">{total.toLocaleString()} ETB</span>
        </div>
        <button className="detail-sticky__add-btn" onClick={onPlaceOrder}>
          {t("placeOrder")}
        </button>
      </div>
    </div>
  )
}
