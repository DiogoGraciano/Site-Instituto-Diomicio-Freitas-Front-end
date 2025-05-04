import { House, History, Clock, Handshake, Phone, SquareChartGantt, Newspaper } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  
  // Função para determinar se um menu está ativo
  const isActive = (path: string) => pathname === path;
  
  // Função para criar os links de âncora 
  const createAnchorLink = (anchor: string) => {
    // Se não estiver na home, redireciona para home com a âncora
    return pathname === '/' ? `#${anchor}` : `/#${anchor}`;
  };
  
  // Função para lidar com a navegação de âncora
  const handleAnchorClick = (anchor: string, e: React.MouseEvent) => {
    if (pathname !== '/') {
      // Se não estiver na home, não previna o comportamento padrão
      // para permitir a navegação para /#ancora
      return;
    }
    
    // Caso esteja na home, previna o comportamento padrão
    // e faça a rolagem manualmente
    e.preventDefault();
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-gray-100 p-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src="/src/assets/logo.jpeg" alt="logo" />
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className={`${isActive('/') ? 'text-blue-700' : 'text-gray-500'} hover:text-blue-800`}>
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-white border border-gray-200">
                  <House/>
                </div>
                <span className="text-xs mt-1">Início</span>
              </div>
            </Link>
            
            <Link to="/historia" className={`${isActive('/historia') ? 'text-blue-700' : 'text-gray-500'} hover:text-blue-800`}>
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-white border border-gray-200">
                    <History/>
                </div>
                <span className="text-xs mt-1">História</span>
              </div>
            </Link>
            
            <a 
              href={createAnchorLink('atividades')} 
              className="text-gray-500 hover:text-blue-700"
              onClick={(e) => handleAnchorClick('atividades', e)}
            >
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-white border border-gray-200">
                  <Clock/>
                </div>
                <span className="text-xs mt-1">Atividades</span>
              </div>
            </a>

            <a 
              href={createAnchorLink('projetos')} 
              className="text-gray-500 hover:text-blue-700"
              onClick={(e) => handleAnchorClick('projetos', e)}
            >
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-white border border-gray-200">
                  <SquareChartGantt/>
                </div>
                <span className="text-xs mt-1">Projetos</span>
              </div>
            </a>
            
            <a 
              href={createAnchorLink('parceiros')} 
              className="text-gray-500 hover:text-blue-700"
              onClick={(e) => handleAnchorClick('parceiros', e)}
            >
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-white border border-gray-200">
                  <Handshake/>
                </div>
                <span className="text-xs mt-1">Parceiros</span>
              </div>
            </a>
            
            <a 
              href={createAnchorLink('contato')} 
              className="text-gray-500 hover:text-blue-700"
              onClick={(e) => handleAnchorClick('contato', e)}
            >
              <div className="flex flex-col items-center">
                <div className="p-2 rounded-full bg-white border border-gray-200">
                  <Phone/>
                </div>
                <span className="text-xs mt-1">Contato</span>
              </div>
            </a>
          </nav>
        </div>
        
        <Link to="/blog" className={`${isActive('/blog') ? 'text-blue-700' : 'text-gray-500'} hover:text-blue-800`}>
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-full bg-white border border-gray-200">
              <Newspaper/>
            </div>
            <span className="text-xs mt-1">Notícias</span>
          </div>
        </Link>
      </div>
    </header>
  );
} 