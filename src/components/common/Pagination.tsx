import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Não renderizar paginação se tivermos apenas uma página
  if (totalPages <= 1) return null;

  // Determinar quais páginas mostrar
  const getPageNumbers = () => {
    const pageNumbers = [];
    const MAX_VISIBLE_PAGES = 5;
    
    // Se tivermos poucas páginas, mostrar todas
    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
    
    // Sempre mostrar a primeira página
    pageNumbers.push(1);
    
    // Calcular o início e fim da janela deslizante
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Ajustar caso a janela deslizante não tenha tamanho suficiente
    if (endPage - startPage + 1 < 3) {
      if (startPage === 2) {
        endPage = Math.min(totalPages - 1, endPage + 1);
      } else if (endPage === totalPages - 1) {
        startPage = Math.max(2, startPage - 1);
      }
    }
    
    // Adicionar elipses se necessário
    if (startPage > 2) {
      pageNumbers.push('...');
    }
    
    // Adicionar páginas da janela deslizante
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Adicionar elipses se necessário
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    // Sempre mostrar a última página
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-1">
      {/* Botão anterior */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full flex items-center justify-center ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-700 hover:bg-blue-50'
        }`}
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {/* Números de página */}
      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              currentPage === page
                ? 'bg-blue-700 text-white'
                : 'text-gray-700 hover:bg-blue-50'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="text-gray-500 px-1">
            {page}
          </span>
        )
      ))}
      
      {/* Botão próximo */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full flex items-center justify-center ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-700 hover:bg-blue-50'
        }`}
        aria-label="Próxima página"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
} 