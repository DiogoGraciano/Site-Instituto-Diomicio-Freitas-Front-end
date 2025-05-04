import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  // Formatando a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      <Link to={`/blog/${post.slug}`}>
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-5">
        <div className="flex items-center space-x-2 mb-3">
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
            {post.category}
          </span>
          <div className="flex items-center text-gray-500 text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(post.date)}
          </div>
        </div>
        
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 hover:text-blue-700">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src={post.authorImage || 'https://placehold.co/100x100'} 
              alt={post.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700">{post.author}</span>
          </div>
          
          <Link 
            to={`/blog/${post.slug}`}
            className="text-blue-700 text-sm hover:text-blue-800 font-medium"
          >
            Ler mais
          </Link>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {post.tags.map((tag, index) => (
              <span 
                key={index} 
                className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 