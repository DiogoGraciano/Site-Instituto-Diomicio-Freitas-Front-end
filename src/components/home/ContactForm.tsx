import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Heart } from 'lucide-react';
import { FormData } from '../../types';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      phone: '',
      subject: '',
      message: ''
    });
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
          <div className="mb-3">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Seu nome"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="(00) 0000-0000"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="subject" className="block text-sm font-medium mb-1">Assunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Assunto da mensagem"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="message" className="block text-sm font-medium mb-1">Mensagem</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Sua mensagem aqui..."
            />
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors text-sm font-medium flex items-center justify-center"
          >
            <Heart className="w-4 h-4 mr-2" />
            Enviar mensagem
          </button>
        </div>
      </div>
    </section>
  );
} 