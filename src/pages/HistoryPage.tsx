import { useEffect, useState } from 'react';
import { History, Milestone, Users, Heart, BookOpen } from 'lucide-react';
import { History as HistoryType } from '../types';
import { fetchHistoryData } from '../services/api';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState<HistoryType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const data = await fetchHistoryData();
        setHistoryData(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    getHistoryData();
  }, []);

  return (
    <div className="font-['Montserrat'] w-full text-gray-800 bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-full mb-4">
              <History className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Nossa História</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Conheça a trajetória do Instituto e como temos transformado vidas desde {historyData?.foundationYear}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-40 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Visão geral */}
            <section className="py-16 px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-center mb-8">Nossa Trajetória</h2>
                <div className="prose max-w-none">
                  {historyData?.content.map((paragraph, index) => (
                    <p key={index} className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* Valores e missão */}
            <section className="py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold text-center mb-12">Nossos Valores</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-full mb-4">
                      <Heart className="text-red-600 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Solidariedade</h3>
                    <p className="text-gray-600">Acreditamos no poder da comunidade e no apoio mútuo para superar desafios.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full mb-4">
                      <BookOpen className="text-green-600 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Educação</h3>
                    <p className="text-gray-600">Promovemos o conhecimento como ferramenta de transformação social e pessoal.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
                      <Users className="text-blue-600 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Inclusão</h3>
                    <p className="text-gray-600">Trabalhamos para que todos tenham as mesmas oportunidades, sem discriminação.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Linha do tempo */}
            <section className="py-16 px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-semibold text-center mb-12">
                  <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mr-2">
                    <Milestone className="text-blue-700 w-5 h-5" />
                  </div>
                  Marcos Históricos
                </h2>
                
                <div className="relative">
                  {/* Linha vertical */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-100"></div>
                  
                  <div className="space-y-12">
                    {historyData?.milestones.map((milestone, index) => (
                      <div 
                        key={index} 
                        className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                      >
                        <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} mb-4 md:mb-0`}>
                          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                            <p className="font-bold text-blue-700 text-xl mb-2">{milestone.year}</p>
                            <p className="text-gray-700 text-lg">{milestone.event}</p>
                          </div>
                        </div>
                        
                        <div className="hidden md:flex items-center justify-center z-10">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-white"></div>
                          </div>
                        </div>
                        
                        <div className="md:w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
} 