import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import LoginForm from '../components/layout/LoginForm';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 p-8">
        <div className="flex-1 max-w-2xl p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo de volta</h1>
          <p className="text-xl text-gray-600 mb-8">Acesse sua conta para continuar</p>
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>
    </div>
  );
};

export default Login;