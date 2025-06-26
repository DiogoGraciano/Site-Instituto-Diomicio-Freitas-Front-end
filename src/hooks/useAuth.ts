import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { registerUser } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.access_token);
      setUser(response.user);
      setLoading(false);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Falha no login';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  }, []);

  const register = useCallback(async (email: string, name: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser({ email, name, password });
      localStorage.setItem('token', response.access_token);
      setUser(response.user);
      setLoading(false);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Falha no registro';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  return { user, login, register, logout, loading, error };
};