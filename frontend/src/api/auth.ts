const API = "http://localhost:4000/api/auth";

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");

  const result = await res.json();

  // 🔑 store token
  localStorage.setItem("token", result.token);

  return result.token;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getMe = async () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const res = await fetch(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;
  return res.json();
};
