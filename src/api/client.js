const LIVE_BACKEND_URL = "https://shanan-hotel-backend.onrender.com";

// Get raw env variable or fallback
const rawUrl = import.meta.env.VITE_API_URL || LIVE_BACKEND_URL;

// Clean stray brackets/quotes, strip trailing slashes, and format /api path safely
const cleanUrl = String(rawUrl).replace(/[\[\]'"]/g, '').replace(/\/$/, '');
const BASE_URL = cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;

// ===============================
// API REQUEST HELPER
// ===============================

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };

  // Only send JSON header if body is NOT FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || `HTTP ${res.status}`);
    }

    return data;
  } catch (err) {
    console.error("API Error:", err.message);
    return null;
  }
}

// ===============================
// API FUNCTIONS
// ===============================

export const api = {
  // =========================
  // ADMIN LOGIN
  // =========================
  adminLogin: (data) =>
    request("/admin/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // =========================
  // DASHBOARD
  // =========================
  getStats: () => request("/stats"),

  // =========================
  // DISHES / MENU
  // =========================
  getDishes: (all = false) => request(`/dishes${all ? "?all=true" : ""}`),

  getDish: (id) => request(`/dishes/${id}`),

  // Supports FormData for image upload
  addDish: (data) =>
    request("/dishes", {
      method: "POST",
      body: data,
    }),

  // Handles both JSON objects and FormData updates
  updateDish: (id, data) =>
    request(`/dishes/${id}`, {
      method: "PUT",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  toggleAvailability: (id, available) =>
    request(`/dishes/${id}/availability`, {
      method: "PATCH",
      body: JSON.stringify({ available }),
    }),

  deleteDish: (id) =>
    request(`/dishes/${id}`, {
      method: "DELETE",
    }),

  // =========================
  // CATEGORIES
  // =========================
  getCategories: () => request("/categories"),

  addCategory: (data) =>
    request("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateCategory: (id, data) =>
    request(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteCategory: (id) =>
    request(`/categories/${id}`, {
      method: "DELETE",
    }),

  // =========================
  // ORDERS
  // =========================
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