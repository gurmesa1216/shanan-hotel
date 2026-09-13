import React, { useState } from 'react'
import './HomeScreen.css'
import { useLanguage } from "../i18n/LanguageContext"
import LanguageSwitcher from "../components/LanguageSwitcher.jsx"
import DishCard from '../components/DishCard.jsx'
import BottomNav from '../components/BottomNav.jsx'

import logoImg from '../assets/logo.svg'
import heroBgImg from '../assets/hero-bg.jpg'
import bodyBgImg from '../assets/body-bg.jpg'
import promoBgImg from '../assets/promo-bg.jpg'

export default function HomeScreen({
  dishes = [],
  categories = [],
  onViewDish,
  onAddToCart,
  onNavigate,
  activeScreen,
  cartCount,
  onAdmin
}) {
  const { t } = useLanguage()

  // 1. Categories with fixed database IDs and dynamic translation keys
  const customCategories = [
    { id: 'VIP Food menu', key: 'vipFoodMenu', icon: '👑' },
    { id: 'Food menu', key: 'foodMenu' },
    { id: 'beverage', key: 'beverage' }
  ]

  // Default selection set to 'VIP Food menu'
  const [activeCategory, setActiveCategory] = useState('VIP Food menu')
  const [searchQuery, setSearchQuery] = useState('')

  // 2. Filter logic: checks both categoryId and category against activeCategory
  const filtered = dishes.filter((d) => {
    const matchCatId = d.categoryId && String(d.categoryId).toLowerCase() === activeCategory.toLowerCase();
    const matchCatName = d.category && String(d.category).toLowerCase() === activeCategory.toLowerCase();
    const matchesCategory = matchCatId || matchCatName;

    const matchesSearch = d.name
      ? d.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  })

  return (
    <div 
      className="screen"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(248, 249, 250, 0.85) 0%, rgba(248, 249, 250, 0.92) 100%), url(${bodyBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* HERO HEADER AREA */}
      <div 
        className="home-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(18, 18, 18, 0.70) 0%, rgba(18, 18, 18, 0.92) 100%), url(${heroBgImg})`
        }}
      >
        <div className="home-hero__top-bar">
          <div className="home-hero__location">
            <div className="home-hero__avatar">
              <img src={logoImg} alt="Shanan Hotel Logo" />
            </div>
            <div className="home-hero__location-text">
              <span className="home-hero__delivery-label">Shanan Hotel & Resort</span>
              <span className="home-hero__city">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 4 }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5-2.5z" />
                </svg>
                Bishoftu
              </span>
            </div>
          </div>
          <div className="home-actions">
            <LanguageSwitcher />

            <button className="home-hero__bell" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="home-hero__bell-dot" />
            </button>
          </div>
        </div>

        {/* Promo Banner Card */}
        <div 
          className="home-promo"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(18, 18, 18, 0.85) 0%, rgba(18, 18, 18, 0.45) 100%), url(${promoBgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="home-promo__text">
            <span className="home-promo__badge">{t("limitedOffer")}</span>
            <h2 className="home-promo__title">{t("firstOrder")}</h2>
            <p className="home-promo__sub">{t("useCode")}</p>
          </div>
          <div className="home-promo__img-wrap">
            <img
              src="https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="Doro Wat"
              className="home-promo__img"
            />
          </div>
        </div>
      </div>

      {/* Search & Filter Floating Bar */}
      <div className="search-row">
        <div className="search-bar">
          <svg className="search-bar__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="search-bar__input"
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="search-filter-btn" aria-label="Filter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
        </button>
      </div>

      {/* BODY SCROLL AREA */}
      <div className="screen__scroll">
        <section className="section">
          <div className="section__header">
            <h2 className="section__title">{t("categories")}</h2>
          </div>
          <div className="chips-scroll">
            {customCategories.map((cat) => {
              const isVip = cat.id === 'VIP Food menu';
              const isActive = activeCategory === cat.id;
              
              return (
                <button
                  key={cat.id}
                  className={`chip${isVip ? ' chip--vip' : ''}${isActive ? ' chip--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.icon && <span className="chip__icon">{cat.icon}</span>}
                  <span className="chip__label">{t(cat.key)}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2 className="section__title">{t("popularDishes")}</h2>
            <button className="section__see-all">{t("seeAll")}</button>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon">🍽️</span>
              <p>{t("noDishes")}</p>
            </div>
          ) : (
            <div className="dish-grid">
              {filtered.map((dish) => (
                <DishCard
                  key={dish._id || dish.id}
                  dish={dish}
                  onAdd={onAddToCart}
                  onView={onViewDish}
                />
              ))}
            </div>
          )}
        </section>

        <div style={{ height: 90 }} />
      </div>

      <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} cartCount={cartCount} />
    </div>
  )
}