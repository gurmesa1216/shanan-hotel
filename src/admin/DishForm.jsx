import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";
import "./DishForm.css";

export default function DishForm({
  dish,
  onClose,
  onSaved
}) {
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
    if (dish) {
      setForm({
        name: dish.name || "",
        category_id: dish.categoryId || dish.category_id || "",
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

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

    const fileInput = document.getElementById("dish-image-file-input");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Compress local image file before sending or setting state
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 600;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas image to compressed Base64 blob/string
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now()
            });
            setImage(compressedFile);
            setPreview(URL.createObjectURL(compressedFile));
          }
        }, "image/jpeg", 0.5);
      };
    };
    reader.readAsDataURL(file);
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
      resetForm();
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
            required
          >
            <option value="">Select Category</option>
            <option value="VIP Food menu">VIP Food menu</option>
            <option value="Food menu">Food menu</option>
            <option value="beverage">beverage</option>
            <option value="VIP Beverage">VIP Beverage</option>
          </select>

          <label>Image URL / Upload</label>
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
                onChange={handleFileChange}
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