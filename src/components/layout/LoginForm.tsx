import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './styles.css';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, name, password);
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="error-message">{error}</div>}
      
      {!isLogin && (
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      
      <button type="submit" className="submit-button">
        {isLogin ? 'Entrar' : 'Registrar'}
      </button>
      
      <button
        type="button"
        className="toggle-button"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Criar uma conta' : 'Já tenho uma conta'}
      </button>
    </form>
  );
};

export default LoginForm;