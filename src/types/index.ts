export interface Activity {
  id: string;
  title: string;
  description?: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Partner {
  id: string;
  name: string;
  description?: string;
  logo: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Contact {
  id?: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactCreateDto {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

export interface History {
  id?: string;
  title: string;
  foundationYear?: string;
  description?: string;
  date?: string;
  content?: string[];
  milestones?: {
    year: string;
    event: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorImage?: string;
  date: string;
  category: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogListResponse {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
}

// Tipos para respostas da API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos para DTOs da API
export interface CreateActivityDto {
  title: string;
  description?: string;
}

export interface CreateProjectDto {
  title: string;
  description: string;
}

export interface CreatePartnerDto {
  name: string;
  description?: string;
}

export interface CreateHistoryDto {
  title: string;
  description?: string;
  date?: string;
}

export interface CreateBlogPostDto {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage?: string;
  category: string;
  tags: string[];
} 