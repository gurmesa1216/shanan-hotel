import React, { useState } from 'react';
import './HomeScreen.css';
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher.jsx";
import DishCard from '../components/DishCard.jsx';
import BottomNav from '../components/BottomNav.jsx';

// Custom logo asset
import logoImg from '../assets/a.jpg';

export default function HomeScreen({
  dishes = [],
  categories = [],
  onViewDish,
  onAddToCart,
  onNavigate,
  activeScreen,
  cartCount,
}) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = dishes.filter((d) => {
    const matchesCategory =
      activeCategory === 'All' ||
      activeCategory === 'All Dishes' ||
      (d.category && d.category.toLowerCase() === activeCategory.toLowerCase());

    const matchesSearch = d.name
      ? d.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="shanan-screen">
      {/* ── Dark Header Hero Section ── */}
      <div className="shanan-hero">
        <div className="shanan-top-bar">
          <div className="shanan-brand">
            <img src={logoImg} alt="Shanan Logo" className="shanan-logo" />
            <div className="shanan-brand-info">
              <span className="shanan-title">Shanan Hotel & Resort</span>
              <span className="shanan-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5-2.5-2.5z" />
                </svg>
                Addis Ababa
              </span>
            </div>
          </div>

          <div className="shanan-top-actions">
            <LanguageSwitcher />
            <button className="shanan-icon-btn" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
          </div>
        </div>

        {/* Promo Card Banner */}
        <div className="shanan-promo-card">
          <div className="shanan-promo-content">
            <span className="shanan-gold-badge">SHANAN HOTEL & RESORT</span>
            <h2 className="shanan-promo-heading">
              Discover Authentic<br />
              Ethiopian &<br />
              International Cuisines
            </h2>
            <span className="shanan-promo-sub">SPECIAL WELCOME</span>
          </div>
        </div>

        {/* Floating Glass Search Bar */}
        <div className="shanan-search-container">
          <div className="shanan-search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search dishes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="shanan-filter-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="7" y1="12" x2="17" y2="12" />
              <line x1="10" y1="18" x2="14" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Light Content Area ── */}
      <div className="shanan-body">
        {/* Categories Section */}
        <section className="shanan-section">
          <div className="shanan-section-header">
            <h3>Categories</h3>
            <button className="shanan-see-all" onClick={() => setActiveCategory('All')}>See all</button>
          </div>
          <div className="shanan-chips-row">
            {categories.map((cat) => (
              <button
                key={cat._id || cat.id}
                className={`shanan-chip ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                <span className="shanan-chip-icon">🍲</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Popular Dishes Section */}
        <section className="shanan-section">
          <div className="shanan-section-header">
            <h3>Popular Dishes</h3>
            <button className="shanan-see-all">See all</button>
          </div>

          <div className="shanan-grid">
            {filtered.map((dish) => (
              <DishCard
                key={dish._id || dish.id}
                dish={dish}
                onAdd={onAddToCart}
                onView={onViewDish}
              />
            ))}
          </div>
        </section>
      </div>

      <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} cartCount={cartCount} />
    </div>
  );
}