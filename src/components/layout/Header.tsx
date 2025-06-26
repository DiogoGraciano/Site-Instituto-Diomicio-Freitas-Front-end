import { House, History, Clock, Handshake, Phone, SquareChartGantt, Newspaper, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface NavItemProps {
  children: React.ReactNode;
  className?: string;
}

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => pathname === path;
  
  const createAnchorLink = (anchor: string) => {
    return pathname === '/' ? `#${anchor}` : `/#${anchor}`;
  };
  
  const handleAnchorClick = (anchor: string, e: React.MouseEvent) => {
    if (pathname !== '/') {
      return;
    }
    
    e.preventDefault();
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const NavItem = ({ children, className = '' }: NavItemProps) => (
    <div className={`group relative ${className}`}>
      {children}
    </div>
  );

  const navItems = [
    { type: 'link' as const, to: '/', icon: House, label: 'Início', isActive: isActive('/') },
    { type: 'link' as const, to: '/historia', icon: History, label: 'História', isActive: isActive('/historia') },
    { type: 'anchor' as const, anchor: 'atividades', icon: Clock, label: 'Atividades' },
    { type: 'anchor' as const, anchor: 'projetos', icon: SquareChartGantt, label: 'Projetos' },
    { type: 'anchor' as const, anchor: 'parceiros', icon: Handshake, label: 'Parceiros' },
    { type: 'anchor' as const, anchor: 'contato', icon: Phone, label: 'Contato' },
  ];

  return (
    <header className="bg-gradient-to-r from-white via-blue-50/30 to-red-50/30 backdrop-blur-lg border-b border-gray-200/50 shadow-lg">
      <div className="w-full mx-auto px-4 md:px-8 lg:px-16">
        <div className="md:grid flex md:grid-cols-3 justify-between w-full h-20">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-red-600 p-0.5 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                  <img src="/src/assets/logo.jpeg" alt="Logo Instituto" className="w-12 h-12 object-cover rounded-lg" />
                </div>
              </div>
            </div>
            
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-red-700 bg-clip-text text-transparent">
                Instituto Diomicio Freitas
              </h1>
              <p className="text-xs text-gray-500 font-medium">Transformando Comunidades</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center justify-center space-x-1">
            {navItems.map((item) => (
              <NavItem key={item.label}>
                {item.type === 'link' ? (
                  <Link 
                    to={item.to} 
                    className={`relative flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300 ${
                      item.isActive 
                        ? 'text-blue-700 bg-blue-50 shadow-md' 
                        : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      item.isActive 
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg' 
                        : 'bg-white border border-gray-200 group-hover:border-blue-300 group-hover:shadow-md'
                    }`}>
                      <item.icon size={18} />
                    </div>
                    <span className="text-xs mt-1 font-medium">{item.label}</span>
                    {item.isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                    )}
                  </Link>
                ) : (
                  <a
                    href={createAnchorLink(item.anchor)}
                    onClick={(e) => handleAnchorClick(item.anchor, e)}
                    className="relative flex flex-col items-center px-4 py-2 rounded-xl text-gray-600 hover:text-blue-700 hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-white border border-gray-200 group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300">
                      <item.icon size={18} />
                    </div>
                    <span className="text-xs mt-1 font-medium">{item.label}</span>
                  </a>
                )}
              </NavItem>
            ))}
          </nav>

          <div className="flex items-center space-x-4 justify-end">
            <Link 
              to="/blog" 
              className={`hidden sm:flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/blog') 
                  ? 'text-red-700 bg-red-50 shadow-md' 
                  : 'text-gray-600 hover:text-red-700 hover:bg-gray-50'
              }`}
            >
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                isActive('/blog') 
                  ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg' 
                  : 'bg-white border border-gray-200 hover:border-red-300 hover:shadow-md'
              }`}>
                <Newspaper size={18} />
              </div>
              <span className="text-xs mt-1 font-medium">Notícias</span>
              {isActive('/blog') && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full"></div>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-blue-700 hover:border-blue-300 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-xl z-50">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.type === 'link' ? (
                    <Link 
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        item.isActive 
                          ? 'text-blue-700 bg-blue-50' 
                          : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        item.isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100'
                      }`}>
                        <item.icon size={18} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : (
                    <a
                      href={createAnchorLink(item.anchor)}
                      onClick={(e) => handleAnchorClick(item.anchor, e)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:text-blue-700 hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="p-2 rounded-lg bg-gray-100">
                        <item.icon size={18} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </a>
                  )}
                </div>
              ))}
              
              <Link 
                to="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive('/blog') 
                    ? 'text-red-700 bg-red-50' 
                    : 'text-gray-600 hover:text-red-700 hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  isActive('/blog') 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100'
                }`}>
                  <Newspaper size={18} />
                </div>
                <span className="font-medium">Notícias</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 