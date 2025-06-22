import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getProfile } from '../services/auth';
import './styles.css';

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
        .then((data) => setUser(data.user))
        .catch(() => logout());
    } else {
      logout();
    }
  }, [logout]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Bem-vindo, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout} className="logout-button">
        Sair
      </button>
    </div>
  );
};

export default Dashboard;