import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Heart, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { Contact } from '../../types';
import { createContact } from '../../services/api';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [contact, setContact] = useState<Contact>({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContact(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Limpar erro quando o usuário começar a digitar
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const validateForm = (): boolean => {
    if (!contact.name.trim()) {
      setErrorMessage('Nome é obrigatório');
      return false;
    }
    if (!contact.phone.trim()) {
      setErrorMessage('Telefone é obrigatório');
      return false;
    }
    if (!contact.subject.trim()) {
      setErrorMessage('Assunto é obrigatório');
      return false;
    }
    if (!contact.message.trim()) {
      setErrorMessage('Mensagem é obrigatória');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await createContact({
        name: contact.name.trim(),
        phone: contact.phone.trim(),
        subject: contact.subject.trim(),
        message: contact.message.trim()
      });
      
      setStatus('success');
      // Reset form after successful submission
      setContact({
        name: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Auto-reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
      
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao enviar mensagem');
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Enviando...
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Mensagem Enviada!
          </>
        );
      default:
        return (
          <>
            <Heart className="w-4 h-4 mr-2" />
            Enviar mensagem
          </>
        );
    }
  };

  const getButtonClass = () => {
    const baseClass = "w-full py-2 px-4 rounded-md transition-colors text-sm font-medium flex items-center justify-center ";
    
    switch (status) {
      case 'loading':
        return baseClass + "bg-gray-400 text-white cursor-not-allowed";
      case 'success':
        return baseClass + "bg-green-600 text-white cursor-default";
      case 'error':
        return baseClass + "bg-red-600 text-white hover:bg-red-700";
      default:
        return baseClass + "bg-blue-700 text-white hover:bg-blue-800";
    }
  };

  return (
    <section className="py-8 px-4" id="contato">
      <h2 className="text-lg font-semibold text-red-700 mb-4">Entre em Contato</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-50 mr-3">
              <Phone className="text-blue-700 w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Telefone</p>
              <p className="text-sm">(11) 1234-5678</p>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-50 mr-3">
              <Mail className="text-blue-700 w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm">contato@organizacao.org</p>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-blue-50 mr-3">
              <MapPin className="text-blue-700 w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Endereço</p>
              <p className="text-sm">Rua da Organização, 123<br />São Paulo - SP</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-50 mr-3">
              <Facebook className="text-blue-700 w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Facebook</p>
              <p className="text-sm">@organizacao</p>
            </div>
          </div>
        </div>
        
        <div>
          {/* Mostrar mensagem de status quando necessário */}
          {status === 'success' && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          )}
          
          {status === 'error' && errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {errorMessage}
            </div>
          )}
          
          <div className="mb-3">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={contact.name}
              onChange={handleInputChange}
              disabled={status === 'loading'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Seu nome"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={contact.phone}
              onChange={handleInputChange}
              disabled={status === 'loading'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="(00) 0000-0000"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="subject" className="block text-sm font-medium mb-1">Assunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={contact.subject}
              onChange={handleInputChange}
              disabled={status === 'loading'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Assunto da mensagem"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="message" className="block text-sm font-medium mb-1">Mensagem</label>
            <textarea
              id="message"
              name="message"
              value={contact.message}
              onChange={handleInputChange}
              disabled={status === 'loading'}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Sua mensagem aqui..."
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={status === 'loading' || status === 'success'}
            className={getButtonClass()}
          >
            {getButtonContent()}
          </button>
        </div>
      </div>
    </section>
  );
} 