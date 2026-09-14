import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";
import "./AdminDashboard.css";

export default function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await api.getStats();
    if (data) {
      setStats(data);
    }
  };

  if (!stats) {
    return (
      <div className="dashboard-loading">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* HEADER SECTION WITH HIGH-CONTRAST ACTION BUTTON */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <button 
          className="dashboard-header-btn"
          onClick={() => onNavigate('admin-menu')}
          aria-label="Options"
        >
          ⚙️ Options
        </button>
      </div>

      <div className="dashboard-cards">
        <StatCard
          title="Total Menu Items"
          value={stats.totalDishes}
          icon="🍽️"
        />

        <StatCard
          title="Available Food"
          value={stats.availableDishes}
          icon="✅"
        />

        <StatCard
          title="Hidden Food"
          value={stats.totalDishes - stats.availableDishes}
          icon="🚫"
        />
      </div>

      {/* REDIRECT TO MENU MANAGER */}
      <button
        className="manage-menu-btn"
        onClick={() => onNavigate('admin-menu')}
      >
        🍽️ Manage Menu
      </button>

      <div className="dashboard-info">
        <h3>Menu Status</h3>
        <p>Your customers only see dishes marked as available.</p>
        <p>Hide finished food from the menu using Menu Manager.</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <h2>{value}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
}