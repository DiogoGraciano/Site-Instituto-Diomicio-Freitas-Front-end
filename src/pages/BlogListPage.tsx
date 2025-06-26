import { useState, useEffect } from 'react';
import { BookOpen, Search, Newspaper } from 'lucide-react';
import { fetchBlogPosts } from '../services/api';
import { BlogListResponse } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BlogPostCard from '../components/common/BlogPostCard';
import Pagination from '../components/common/Pagination';

export default function BlogListPage() {
  const [blogData, setBlogData] = useState<BlogListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  useEffect(() => {
    const loadBlogPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchBlogPosts(currentPage);
        setBlogData(data);
      } catch (error) {
        console.error("Erro ao carregar os posts do blog:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = blogData?.posts
    ? ['Todos', ...Array.from(new Set(blogData.posts.map(post => post.category)))]
    : ['Todos'];

  const filteredPosts = blogData?.posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="font-['Montserrat'] w-full text-gray-800 bg-white min-h-screen flex flex-col">
      <Header />

      <div className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-full mb-4">
            <Newspaper className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Notícias e Eventos</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Acompanhe as últimas novidades, histórias inspiradoras e eventos do nosso Instituto
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredPosts && filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
            
            {searchTerm === '' && activeCategory === 'Todos' && blogData && (
              <Pagination
                currentPage={blogData.currentPage}
                totalPages={blogData.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhum post encontrado</h3>
            <p className="text-gray-500">
              Tente ajustar seus filtros ou buscar por outros termos.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
} 