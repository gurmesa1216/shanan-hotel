import React, { useEffect, useState, useRef } from "react";
import { api } from "../api/client.js";
import DishForm from "./DishForm.jsx";
import "./MenuManager.css";

// SVG Icons
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const TagIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const ImageIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function MenuManager({ refreshDishes, categories = [] }) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedDishForImage, setSelectedDishForImage] = useState(null);
  const [uploadingDishId, setUploadingDishId] = useState(null);

  const fileInputRef = useRef(null);

  const loadMenu = async () => {
    const data = await api.getDishes(true);
    if (data) {
      setDishes(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMenu();
  }, []);

  // TOGGLE VISIBILITY
  const toggleFood = async (dish) => {
    await api.toggleAvailability(dish.id, !dish.available);
    loadMenu();
    if (refreshDishes) refreshDishes();
  };

  // CHANGE PRICE
  const changePrice = async (dish) => {
    const newPrice = prompt("Enter new price (ETB):", dish.price);
    if (!newPrice) return;

    await api.updateDish(dish.id, { price: Number(newPrice) });
    loadMenu();
    if (refreshDishes) refreshDishes();
  };

  // DELETE DISH
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this food?");
    if (!confirmDelete) return;

    try {
      await api.deleteDish(id);
      setDishes((prev) => prev.filter((dish) => dish.id !== id));
      if (refreshDishes) refreshDishes();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  // OPEN IMAGE SELECTOR
  const triggerImageChange = (dish) => {
    setSelectedDishForImage(dish);
    const choice = window.confirm(
      "Click OK to upload a photo from your local device, or CANCEL to enter an Image URL."
    );

    if (choice) {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else {
      const imageUrl = prompt("Paste image URL:", dish.image);
      if (imageUrl) {
        updateDishImageUrl(dish.id, imageUrl);
      }
    }
  };

  // MULTIPART FILE UPLOAD (FOR LOCAL STORAGE FILES)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedDishForImage) return;

    const dishId = selectedDishForImage.id;
    setUploadingDishId(dishId);

    try {
      const formData = new FormData();
      formData.append("image", file);

      // Get backend API base URL from client or fallback
      const API_BASE_URL = process.env.REACT_APP_API_URL || "https://shanan-hotel-backend.onrender.com";

      const response = await fetch(`${API_BASE_URL}/api/dishes/${dishId}/image`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        await loadMenu();
        if (refreshDishes) refreshDishes();
      } else {
        alert("Image upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("File upload error:", err);
      alert("Failed to upload local image file");
    } finally {
      setUploadingDishId(null);
      e.target.value = "";
    }
  };

  // URL UPDATE FALLBACK
  const updateDishImageUrl = async (dishId, imageUrl) => {
    await api.updateDish(dishId, { image_url: imageUrl });
    loadMenu();
    if (refreshDishes) refreshDishes();
  };

  if (loading) {
    return <div className="menu-manager-loading">Loading menu...</div>;
  }

  return (
    <div className="menu-manager">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="menu-manager-header">
        <div>
          <h2>Restaurant Menu</h2>
          <p className="menu-manager-subtitle">Manage availability, pricing, and food gallery</p>
        </div>

        <button className="add-food-button" onClick={() => setShowForm(true)}>
          <PlusIcon />
          <span>Add Food</span>
        </button>
      </div>

      {showForm && (
        <DishForm
          categories={categories}
          onClose={() => setShowForm(false)}
          onSaved={() => loadMenu()}
        />
      )}

      <div className="menu-grid">
        {dishes.map((dish) => (
          <div className="menu-card" key={dish.id}>
            <div className="menu-card-image-wrapper">
              <img src={dish.image} alt={dish.name} />

              <button
                className="delete-btn"
                onClick={() => handleDelete(dish.id)}
                aria-label="Delete Dish"
              >
                <TrashIcon />
                <span>Delete</span>
              </button>

              <span
                className={`status-badge ${
                  dish.available ? "status-badge--active" : "status-badge--hidden"
                }`}
              >
                {dish.available ? "Available" : "Hidden"}
              </span>
            </div>

            <div className="menu-card-body">
              <h3>{dish.name}</h3>
              <p className="menu-card-price">
                {dish.price} <span className="currency">ETB</span>
              </p>

              <div className="menu-card-actions">
                <button className="action-btn" onClick={() => changePrice(dish)}>
                  <TagIcon />
                  <span>Change Price</span>
                </button>

                <button
                  className="action-btn"
                  onClick={() => triggerImageChange(dish)}
                  disabled={uploadingDishId === dish.id}
                >
                  <ImageIcon />
                  <span>
                    {uploadingDishId === dish.id ? "Uploading..." : "Change Image"}
                  </span>
                </button>

                <button
                  className={`action-btn toggle-btn ${
                    dish.available ? "toggle-btn--hide" : "toggle-btn--show"
                  }`}
                  onClick={() => toggleFood(dish)}
                >
                  {dish.available ? <EyeOffIcon /> : <EyeIcon />}
                  <span>{dish.available ? "Hide Food" : "Show Food"}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}