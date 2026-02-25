const BASE_URL = import.meta.env.VITE_API_URL;
const API = `${BASE_URL}/api/auth`;

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message || 'Registration failed');
  }

  return result;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message || 'Login failed');
  }

  localStorage.setItem('token', result.token);

  return result.token;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getMe = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const res = await fetch(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    localStorage.removeItem('token');
    return null;
  }

  return res.json();
};
