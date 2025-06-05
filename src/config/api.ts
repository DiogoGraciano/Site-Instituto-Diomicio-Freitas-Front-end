// Configuração da API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// Função para atualizar a URL da API dinamicamente
export const updateApiUrl = (newUrl: string) => {
  API_CONFIG.BASE_URL = newUrl.endsWith('/') ? newUrl.slice(0, -1) : newUrl;
};

// Função para obter a URL da API atual
export const getApiUrl = () => API_CONFIG.BASE_URL;

