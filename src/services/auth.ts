import { API_CONFIG } from "../config/api";

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Falha no login');
  }

  return response.json();
};

export const getProfile = async (token: string) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/auth/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Falha ao obter perfil');
  }

  return response.json();
};