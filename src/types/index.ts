export interface Activity {
  id: string;
  title: string;
  image: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface FormData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

export interface HistoryData {
  title: string;
  foundationYear: string;
  content: string[];
  milestones: {
    year: string;
    event: string;
  }[];
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
}

export interface BlogListResponse {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
} 