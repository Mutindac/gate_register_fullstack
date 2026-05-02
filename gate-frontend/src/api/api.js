const BASE_URL = "http://127.0.0.1:5000/api/";

export const api = {
  get: async (url, requireAuth = true) => {
    const headers = {};

    if (requireAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const res = await fetch(BASE_URL + url, {
      headers,
    });

    return res.json();
  },

  post: async (url, data, requireAuth = true) => {
    const headers = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const res = await fetch(BASE_URL + url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const text = await res.text();
    return text ? JSON.parse(text) : {};
  },
};