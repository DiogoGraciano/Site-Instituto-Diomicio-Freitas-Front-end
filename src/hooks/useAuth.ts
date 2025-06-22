import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/auth';

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  access_token: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.access_token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (email: string, name: string, password: string) => {
    setLoading(true);
    try {
      const response = await registerUser({ email, name, password });
      localStorage.setItem('token', response.access_token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return { login, register, logout, loading };
};