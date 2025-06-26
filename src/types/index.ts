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

export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHistoryDto {
  title: string;
  foundationYear?: string;
  content?: string[];
  milestones?: {
    year: string;
    event: string;
  }[];
}

export interface History {
  id?: string;
  title: string;
  foundationYear?: string;
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

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
}