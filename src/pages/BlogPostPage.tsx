import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Clock, Bookmark, Share2, ChevronRight } from 'lucide-react';
import { fetchBlogPostBySlug, fetchBlogPosts } from '../services/api';
import { BlogPost } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        if (slug) {
          const postData = await fetchBlogPostBySlug(slug);
          setPost(postData);

          // Buscar posts relacionados (da mesma categoria ou com tags semelhantes)
          if (postData) {
            const allPosts = await fetchBlogPosts(1, 100);
            const filtered = allPosts.posts
              .filter(p => p.id !== postData.id) // Remover o post atual
              .filter(p => 
                p.category === postData.category || // Mesma categoria
                p.tags.some(tag => postData.tags.includes(tag)) // Pelo menos uma tag em comum
              )
              .slice(0, 3); // Limitar a 3 posts relacionados
            
            setRelatedPosts(filtered);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar o post:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  // Formatando a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Calculando o tempo de leitura (aproximado, baseado em palavras)
  const calculateReadingTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Média de 200 palavras por minuto
    return readingTime;
  };

  return (
    <div className="font-['Montserrat'] w-full text-gray-800 bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {loading ? (
          <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="flex space-x-4">
                <div className="h-3 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ) : post ? (
          <>
            {/* Imagem de destaque */}
            <div className="w-full h-64 md:h-96 bg-gray-100 relative">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute top-4 left-4">
                <Link 
                  to="/blog"
                  className="flex items-center text-white bg-blue-700 bg-opacity-90 px-4 py-2 rounded-full text-sm hover:bg-opacity-100 transition"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar para o blog
                </Link>
              </div>
            </div>

            {/* Conteúdo principal */}
            <div className="max-w-4xl mx-auto px-4 py-8">
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>

                <div className="flex items-center text-gray-600 mb-6">
                  <div className="flex items-center mr-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(post.date)}
                  </div>
                  
                  <div className="flex items-center mr-6">
                    <User className="w-4 h-4 mr-2" />
                    {post.author}
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {calculateReadingTime(post.content)} min de leitura
                  </div>
                </div>
              </div>

              {/* Artigo com o conteúdo do post */}
              <article className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>

              {/* Compartilhar e favoritos */}
              <div className="flex justify-between border-t border-b border-gray-200 py-4 mt-8">
                <button className="flex items-center text-gray-600 hover:text-blue-700">
                  <Bookmark className="w-5 h-5 mr-2" />
                  Salvar
                </button>
                
                <button className="flex items-center text-gray-600 hover:text-blue-700">
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartilhar
                </button>
              </div>

              {/* Autor */}
              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg mt-8">
                <img 
                  src={post.authorImage || 'https://placehold.co/100x100'} 
                  alt={post.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-gray-600">
                    Responsável por {post.category.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Posts relacionados */}
            {relatedPosts.length > 0 && (
              <div className="bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                  <h2 className="text-2xl font-bold mb-6">Posts Relacionados</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map(relatedPost => (
                      <Link 
                        to={`/blog/${relatedPost.slug}`}
                        key={relatedPost.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                      >
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <p className="text-sm text-blue-700 mb-2">{relatedPost.category}</p>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{relatedPost.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                          
                          <div className="flex items-center text-blue-700 mt-4 text-sm font-medium">
                            Ler mais
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Post não encontrado</h2>
            <p className="text-gray-600 mb-8">
              O post que você está procurando não existe ou foi removido.
            </p>
            <Link 
              to="/blog"
              className="inline-flex items-center bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para o blog
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
} 