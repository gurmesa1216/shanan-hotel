import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";
import "./DishForm.css";

export default function DishForm({
  dish,
  onClose,
  onSaved
}) {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    description: "",
    price: "",
    portion: "",
    image_url: "",
    rating: "",
    prep_time_minutes: "",
    available: true
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadCategories();

    if (dish) {
      setForm({
        name: dish.name || "",
        category_id: dish.categoryId || "",
        description: dish.description || "",
        price: dish.price || "",
        portion: dish.portion || "",
        image_url: dish.image || "",
        rating: dish.rating || "",
        prep_time_minutes: dish.prepTime || "",
        available: dish.available
      });
      setPreview(dish.image || "");
    }
  }, [dish]);

  const loadCategories = async () => {
    const data = await api.getCategories();
    if (data) {
      setCategories(data);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // RESET ALL FORM STATES AND FILE INPUT
  const resetForm = () => {
    setForm({
      name: "",
      category_id: "",
      description: "",
      price: "",
      portion: "",
      image_url: "",
      rating: "",
      prep_time_minutes: "",
      available: true
    });
    setImage(null);
    setPreview("");

    // Clear file input DOM element
    const fileInput = document.getElementById("dish-image-file-input");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const saveDish = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("category_id", form.category_id);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("portion", form.portion);
    data.append("rating", form.rating);
    data.append("prep_time_minutes", form.prep_time_minutes);
    data.append("available", form.available);

    if (image) {
      data.append("image", image);
    }

    let result;
    if (dish) {
      result = await api.updateDish(dish.id, data);
    } else {
      result = await api.addDish(data);
    }

    if (result) {
      resetForm(); // Reset everything after success
      onSaved();
      onClose();
    }
  };

  return (
    <div className="form-overlay">
      <div className="dish-form">
        <h2>{dish ? "Edit Dish" : "Add New Dish"}</h2>

        <form onSubmit={saveDish}>
          <label>Dish Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <label>Image URL</label>
          <div className="image-upload-box">
            {preview && (
              <img src={preview} alt="preview" className="image-preview" />
            )}

            <label className="upload-btn">
              📷 Choose Food Image
              <input
                id="dish-image-file-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>

          <label>Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <label>Portion</label>
          <input
            name="portion"
            value={form.portion}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <label>Preparation Time (minutes)</label>
          <input
            type="number"
            name="prep_time_minutes"
            value={form.prep_time_minutes}
            onChange={handleChange}
          />

          <label>Rating</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            value={form.rating}
            onChange={handleChange}
          />

          <label className="checkbox">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
            />
            Available
          </label>

          <div className="form-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save Dish</button>
          </div>
        </form>
      </div>
    </div>
  );
}