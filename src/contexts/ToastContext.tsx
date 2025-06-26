import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ToastType } from '../components/common/Toast';

interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
  showApiError: (error: any, defaultTitle?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((title: string, message?: string) => {
    addToast({ type: 'success', title, message });
  }, [addToast]);

  const showError = useCallback((title: string, message?: string) => {
    addToast({ type: 'error', title, message, duration: 8000 });
  }, [addToast]);

  const showWarning = useCallback((title: string, message?: string) => {
    addToast({ type: 'warning', title, message });
  }, [addToast]);

  const showInfo = useCallback((title: string, message?: string) => {
    addToast({ type: 'info', title, message });
  }, [addToast]);

  const showApiError = useCallback((error: any, defaultTitle = 'Erro') => {
    const getErrorMessage = (error: any): { title: string; message: string } => {
      // Se o erro tem uma resposta da API
      if (error?.response?.data) {
        const data = error.response.data;
        
        // Se tem uma mensagem específica
        if (data.message) {
          return { title: defaultTitle, message: data.message };
        }
        
        // Se tem um array de erros
        if (data.errors) {
          if (Array.isArray(data.errors)) {
            return { title: defaultTitle, message: data.errors.join(', ') };
          }
          if (typeof data.errors === 'object') {
            return { title: defaultTitle, message: Object.values(data.errors).flat().join(', ') };
          }
        }
        
        // Se tem erro como string
        if (data.error) {
          return { title: defaultTitle, message: data.error };
        }
      }
      
      // Se o erro tem uma mensagem direta
      if (error?.message) {
        return { title: defaultTitle, message: error.message };
      }
      
      // Mensagem padrão
      return { title: defaultTitle, message: 'Erro interno do servidor. Tente novamente.' };
    };

    const { title, message } = getErrorMessage(error);
    showError(title, message);
  }, [showError]);

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showApiError,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }
  return context;
}; 