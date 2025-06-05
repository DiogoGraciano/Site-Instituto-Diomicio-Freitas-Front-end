import { useEffect, useState } from 'react';
import { History, Milestone, Users, Heart, BookOpen, AlertCircle } from 'lucide-react';
import { History as HistoryType } from '../types';
import { fetchHistoryData } from '../services/api';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState<HistoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const data = await fetchHistoryData();
        setHistoryData(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        setError(error instanceof Error ? error.message : 'Erro ao carregar histórico');
      } finally {
        setLoading(false);
      }
    };

    getHistoryData();
  }, []);

  // Combinar todos os conteúdos e marcos dos históricos
  const combinedContent = historyData.flatMap(item => item.content || []);
  const combinedMilestones = historyData.flatMap(item => item.milestones || [])
    .sort((a, b) => parseInt(a.year) - parseInt(b.year));
  
  // Encontrar o ano de fundação (menor ano nos marcos ou campo específico)
  const foundationYear = historyData.find(item => item.foundationYear)?.foundationYear ||
    combinedMilestones[0]?.year || 
    '1998';

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
              Conheça a trajetória do Instituto e como temos transformado vidas desde {foundationYear}
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
        ) : error ? (
          <div className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-full mb-4">
                <AlertCircle className="text-red-600 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Erro ao carregar histórico</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Visão geral */}
            <section className="py-16 px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-center mb-8">Nossa Trajetória</h2>
                
                {combinedContent.length > 0 ? (
                  <div className="prose max-w-none">
                    {combinedContent.map((paragraph, index) => (
                      <p key={index} className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="prose max-w-none text-center">
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      O Instituto foi fundado em {foundationYear} com o objetivo de proporcionar oportunidades de educação e desenvolvimento para crianças e jovens em situação de vulnerabilidade social.
                    </p>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      Começamos com apenas uma sala de aula e 15 alunos. Hoje, atendemos mais de 500 pessoas anualmente com diversos programas educacionais, culturais e de capacitação profissional.
                    </p>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      Nossa missão é transformar vidas através da educação, cultura e desenvolvimento humano, contribuindo para a construção de uma sociedade mais justa e igualitária.
                    </p>
                  </div>
                )}
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
            {combinedMilestones.length > 0 && (
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
                      {combinedMilestones.map((milestone, index) => (
                        <div 
                          key={`${milestone.year}-${index}`} 
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
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
} 