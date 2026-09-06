import React, { useState } from 'react'
import './DishDetailScreen.css'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'

export default function DishDetailScreen({ dish, onBack, onAddToCart }) {
  const { t } = useLanguage()
  const [qty, setQty] = useState(1)
  const [expanded, setExpanded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [favorited, setFavorited] = useState(false)

  const total = dish.price * qty

  const descShort = dish.description.length > 100
    ? dish.description.slice(0, 100) + '…'
    : dish.description

  return (
    <div className="screen screen--white">
      {/* Top bar */}
      <div className="detail-topbar">
        <button className="icon-btn" onClick={onBack} aria-label={t("back")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="detail-topbar__title">{t("details")}</h1>
        <button
          className={`icon-btn${favorited ? ' icon-btn--active-heart' : ''}`}
          onClick={() => setFavorited(!favorited)}
          aria-label="Favourite"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={favorited ? '#C4432B' : 'none'} stroke={favorited ? '#C4432B' : 'currentColor'} strokeWidth="2" strokeLinecap="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="detail-scroll">
        {/* Hero photo */}
        <div className="detail-hero">
          <img
            src={
              dish.gallery && dish.gallery.length > 0
                ? dish.gallery[activeImg]
                : dish.image
            }
            alt={dish.name}
            className="detail-hero__img"
          />
          {dish.gallery.length > 1 && (
            <div className="detail-dots">
              {dish.gallery.map((_, i) => (
                <button
                  key={i}
                  className={`detail-dot${i === activeImg ? ' detail-dot--active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="detail-body">
          {/* Name + restaurant */}
          <div className="detail-title-row">
            <h2 className="detail-name">{dish.name}</h2>
          </div>
          <p className="detail-restaurant">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#0B6B3A" style={{ marginRight: 4, flexShrink: 0 }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {dish.restaurant}
          </p>

          {/* Info pills */}
          <div className="detail-pills">
            <div className="detail-pill detail-pill--green">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {t("delivered")}
            </div>
            <div className="detail-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {dish.prepTime} min
            </div>
            <div className="detail-pill detail-pill--gold">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#F2B705" stroke="#F2B705" strokeWidth="0.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {dish.rating} {t("rating")}
            </div>
          </div>

          {/* Ethiopian divider accent */}
          <div className="habesha-divider" />

          {/* Description */}
          <p className="detail-desc">
            {expanded ? dish.description : descShort}
            {dish.description.length > 100 && (
              <button className="detail-see-more" onClick={() => setExpanded(!expanded)}>
                {expanded ? ` ${t("showLess")}`  : ` ...${t("seeMore")}`}
              </button>
            )}
          </p>

          {/* Customize + Qty */}
          <div className="detail-customize-row">
            <button className="detail-customize-btn">
              {t("customize")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ marginLeft: 4 }}>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="detail-qty-row">
            <span className="detail-qty-label">{t("quantity")}</span>
            <QuantityStepper
              value={qty}
              onDecrement={() => setQty((q) => Math.max(1, q - 1))}
              onIncrement={() => setQty((q) => q + 1)}
            />
          </div>
        </div>

        <div style={{ height: 110 }} />
      </div>

      {/* Sticky bottom bar */}
      <div className="detail-sticky">
        <div className="detail-sticky__total">
          <span className="detail-sticky__total-label">{t("total")}</span>
          <span className="detail-sticky__total-price">{total.toLocaleString()} ETB</span>
        </div>
        <button
          className="detail-sticky__add-btn"
          onClick={() => {
            for (let i = 0; i < qty; i++) onAddToCart(dish)
          }}
        >
          {t("addCart")}
        </button>
      </div>
    </div>
  )
}
