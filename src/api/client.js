const LIVE_BACKEND_URL = "https://shanan-hotel-backend.onrender.com";

const rawUrl = import.meta.env.VITE_API_URL || LIVE_BACKEND_URL;
const cleanUrl = String(rawUrl).replace(/[\[\]'"]/g, '').replace(/\/$/, '');
const BASE_URL = cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;

// Safe Request Helper to handle Non-JSON responses gracefully
async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });

    const contentType = res.headers.get("content-type");
    let data = {};

    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = { error: text || `HTTP ${res.status}` };
    }

    if (!res.ok) {
      throw new Error(data.error || `HTTP ${res.status}`);
    }

    return data;
  } catch (err) {
    console.error("API Request Error:", err.message);
    return { error: err.message };
  }
}

// Convert File to Base64 String Helper
const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

export const api = {
  // ADMIN AUTH
  adminLogin: (data) =>
    request("/admin/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // DASHBOARD
  getStats: () => request("/stats"),

  // DISHES
  getDishes: (all = false) => request(`/dishes${all ? "?all=true" : ""}`),

  getDish: (id) => request(`/dishes/${id}`),

  addDish: (data) =>
    request("/dishes", {
      method: "POST",
      body: data,
    }),

  updateDish: (id, data) =>
    request(`/dishes/${id}`, {
      method: "PUT",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  // Dual-strategy Upload: Tries FormData POST route first, falls back to Base64 PUT route
  uploadDishImage: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await request(`/dishes/${id}/image`, {
        method: "POST",
        body: formData,
      });

      if (res && !res.error) {
        return res;
      }

      console.warn("Multipart endpoint unavailable. Retrying via Base64 upload...");
      const base64 = await fileToBase64(file);
      return await request(`/dishes/${id}`, {
        method: "PUT",
        body: JSON.stringify({ image_url: base64 }),
      });
    } catch (err) {
      console.error("Image upload failed completely:", err);
      return { error: err.message };
    }
  },

  toggleAvailability: (id, available) =>
    request(`/dishes/${id}/availability`, {
      method: "PATCH",
      body: JSON.stringify({ available }),
    }),

  deleteDish: (id) =>
    request(`/dishes/${id}`, {
      method: "DELETE",
    }),

  // CATEGORIES
  getCategories: () => request("/categories"),

  // ORDERS
  getOrders: () => request("/orders"),

  createOrder: (data) =>
    request("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateOrderStatus: (id, status) =>
    request(`/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};