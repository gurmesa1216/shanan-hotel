import React from 'react'
import './DishCard.css'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function DishCard({
  dish,
  onAdd,
  onView
}) {
  const { t } = useLanguage()
  const unavailable = dish.available === false

  return (
    <div
      className={`dish-card ${unavailable ? 'dish-card--unavailable' : ''}`}
      onClick={() => onView(dish)}
    >
      <div className="dish-card__img-wrap">
        <img
          src={dish.image}
          alt={dish.name}
          className="dish-card__img"
          loading="lazy"
        />

        {unavailable && (
          <span className="dish-card__unavailable-tag">
            {t("hidden")}
          </span>
        )}

        {/* Floating dark title box with bottom red/coral line */}
        <div className="dish-card__overlay">
          <div className="dish-card__overlay-content">
            <h3 className="dish-card__name">{dish.name}</h3>
            {dish.portion && (
              <p className="dish-card__portion">{dish.portion}</p>
            )}
            {dish.price && (
              <p className="dish-card__price">{dish.price.toLocaleString()} ETB</p>
            )}
          </div>
          <div className="dish-card__accent-line" />
        </div>
      </div>
    </div>
  )
}