import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import LoginForm from '../components/layout/LoginForm';
import './styles.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-content">
        <div className="login-left">
          <h1>Bem-vindo de volta</h1>
          <p>Acesse sua conta para continuar</p>
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
        <div className="login-right">
         

        </div>
      </div>
    </div>
  );
};

export default Login;