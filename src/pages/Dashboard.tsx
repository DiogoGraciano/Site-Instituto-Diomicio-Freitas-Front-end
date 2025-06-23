import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getProfile } from '../services/auth';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
  } | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile(token)
        .then((userData) => setUser(userData))
        .catch(() => logout());
    } else {
      logout();
    }
  }, [logout]);

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Bem-vindo, {user.name}</h1>
        <p className="text-lg text-gray-600 mb-6">Email: {user.email}</p>
        <button
          onClick={logout}
          className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Dashboard;