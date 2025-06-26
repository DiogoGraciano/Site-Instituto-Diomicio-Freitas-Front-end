import { useState } from 'react';
import { Heart, Copy, CheckCircle, QrCode, CreditCard } from 'lucide-react';

export default function DonationSection() {
  const [copied, setCopied] = useState(false);
  const pixKey = "instituto@exemplo.com.br"; // Substitua pela chave PIX real
  const instituteName = "Instituto de Desenvolvimento Social";

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <section className="py-6 px-4" id="doacoes">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-3">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Faça uma Doação
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sua contribuição faz a diferença! Ajude-nos a continuar transformando vidas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PIX Section */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Doação via PIX</h3>
                <p className="text-gray-600 text-sm">Rápido, fácil e seguro</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-xs text-gray-600 mb-2">Chave PIX:</p>
              <div className="flex items-center justify-between bg-white rounded-md border p-2">
                <span className="text-gray-800 font-mono text-xs flex-1 truncate">
                  {pixKey}
                </span>
                <button
                  onClick={handleCopyPix}
                  className={`ml-2 p-1.5 rounded-md transition-colors ${
                    copied 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={copied ? 'Copiado!' : 'Copiar chave PIX'}
                >
                  {copied ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-green-600 text-xs mt-1 flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Chave PIX copiada!
                </p>
              )}
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">Ou escaneie o QR Code:</p>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-lg border border-gray-300">
                <div className="text-center">
                  <QrCode className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                  <span className="text-xs text-gray-500">QR PIX</span>
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Como sua doação ajuda
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-blue-600 font-semibold text-xs">R$</span>
                </div>
                <div>
                  <span className="font-medium text-gray-800 text-sm">R$ 20</span>
                  <span className="text-gray-600 text-xs ml-2">Alimenta uma família atendida pelo Instituto</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-green-600 font-semibold text-xs">R$</span>
                </div>
                <div>
                  <span className="font-medium text-gray-800 text-sm">R$ 50</span>
                  <span className="text-gray-600 text-xs ml-2"> Ajuda na educação de jovens com deficiência</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-red-600 font-semibold text-xs">R$</span>
                </div>
                <div>
                  <span className="font-medium text-gray-800 text-sm">R$ 100</span>
                  <span className="text-gray-600 text-xs ml-2">Garante apoio a um aluno por uma semana</span>
                </div>
              </div>
            </div>

            <div className="mt-3 p-3 bg-white/60 rounded-lg border border-white/50">
              <p className="text-xs text-gray-700 text-center">
                <strong>100% das doações</strong> vão direto aos projetos sociais
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-xs">
            Doações seguras • Comprovante por email
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {instituteName} - CNPJ: 00.000.000/0001-00
          </p>
        </div>
      </div>
    </section>
  );
} 