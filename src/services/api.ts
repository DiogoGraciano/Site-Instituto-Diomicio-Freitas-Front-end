import { 
  History, 
  BlogPost, 
  BlogListResponse, 
  Activity, 
  Partner, 
  Project,
  Contact,
  ContactCreateDto,
  PaginatedResponse
} from '../types';
import { API_CONFIG } from '../config/api';

// ============= ACTIVITIES =============
export const fetchActivities = async (): Promise<Activity[]> => {
  try {
    const response = await apiRequest<Activity[]>('/activities');
    return response;
  } catch (error) {
    console.error('Erro ao buscar atividades:', error);
    throw new Error('Falha ao carregar atividades');
  }
};

export const fetchActivityById = async (id: string): Promise<Activity> => {
  try {
    const response = await apiRequest<Activity>(`/activities/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao buscar atividade:', error);
    throw new Error('Falha ao carregar atividade');
  }
};

// ============= PARTNERS =============
export const fetchPartners = async (): Promise<Partner[]> => {
  try {
    const response = await apiRequest<Partner[]>('/partners');
    return response;
  } catch (error) {
    console.error('Erro ao buscar parceiros:', error);
    throw new Error('Falha ao carregar parceiros');
  }
};

export const fetchPartnerById = async (id: string): Promise<Partner> => {
  try {
    const response = await apiRequest<Partner>(`/partners/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao buscar parceiro:', error);
    throw new Error('Falha ao carregar parceiro');
  }
};

// ============= PROJECTS =============
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await apiRequest<Project[]>('/projects');
    return response;
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    throw new Error('Falha ao carregar projetos');
  }
};

export const fetchProjectById = async (id: string): Promise<Project> => {
  try {
    const response = await apiRequest<Project>(`/projects/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    throw new Error('Falha ao carregar projeto');
  }
};

// ============= HISTORY =============
export const fetchHistoryData = async (): Promise<History[]> => {
  try {
    const response = await apiRequest<History[]>('/history');
    return response;
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    throw new Error('Falha ao carregar histórico');
  }
};

export const fetchHistoryById = async (id: string): Promise<History> => {
  try {
    const response = await apiRequest<History>(`/history/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao buscar item do histórico:', error);
    throw new Error('Falha ao carregar item do histórico');
  }
};

// ============= BLOG POSTS =============
export const fetchBlogPosts = async (
  page: number = 1, 
  limit: number = 6,
  category?: string
): Promise<BlogListResponse> => {
  try {
    let endpoint = `/posts?page=${page}&limit=${limit}`;
    if (category && category !== 'Todos') {
      endpoint += `&category=${encodeURIComponent(category)}`;
    }
    
    const response = await apiRequest<PaginatedResponse<BlogPost>>(endpoint);
    
    // Mapear a resposta paginada para o formato esperado
    return {
      posts: response.data,
      totalPages: response.pagination.totalPages,
      currentPage: response.pagination.page
    };
  } catch (error) {
    console.error('Erro ao buscar posts do blog:', error);
    throw new Error('Falha ao carregar posts do blog');
  }
};

export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await apiRequest<BlogPost>(`/posts/slug/${slug}`);
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      return null; // Post não encontrado
    }
    console.error('Erro ao buscar post do blog:', error);
    throw new Error('Falha ao carregar post do blog');
  }
};

export const fetchBlogPostById = async (id: string): Promise<BlogPost> => {
  try {
    const response = await apiRequest<BlogPost>(`/posts/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao buscar post do blog:', error);
    throw new Error('Falha ao carregar post do blog');
  }
};

// ============= CONTACTS =============
export const createContact = async (contactData: ContactCreateDto): Promise<Contact> => {
  try {
    const response = await apiRequest<Contact>('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
    return response;
  } catch (error) {
    console.error('Erro ao criar contato:', error);
    throw new Error('Falha ao enviar contato');
  }
};

export const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const response = await apiRequest<Contact[]>('/contacts');
    return response;
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    throw new Error('Falha ao carregar contatos');
  }
};

export const fetchContactById = async (id: string): Promise<Contact> => {
  try {
    const response = await apiRequest<Contact>(`/contacts/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao buscar contato:', error);
    throw new Error('Falha ao carregar contato');
  }
};

export const deleteContact = async (id: string): Promise<void> => {
  try {
    await apiRequest<void>(`/contacts/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Erro ao deletar contato:', error);
    throw new Error('Falha ao deletar contato');
  }
};

// ============= UPLOAD DE ARQUIVOS =============
export const uploadFile = async (file: File, endpoint: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await apiRequest<{ url: string }>(endpoint, {
      method: 'POST',
      headers: {
        // Remover Content-Type para permitir que o browser defina automaticamente com boundary
      },
      body: formData,
    });
    
    return response.url;
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    throw new Error('Falha no upload do arquivo');
  }
};

// ============= UTILITÁRIOS =============
export const healthCheck = async (): Promise<{ status: string; timestamp: string }> => {
  try {
    const response = await apiRequest<{ status: string; timestamp: string }>('/');
    return response;
  } catch (error) {
    console.error('Erro no health check:', error);
    throw new Error('API indisponível');
  }
};

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}; 

const apiRequest = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
    ...options,
  };

  let lastError: Error | null = null;
  
  // Implementa retry automático
  for (let attempt = 1; attempt <= API_CONFIG.RETRY_ATTEMPTS; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text() as T;
    } catch (error) {
      lastError = error as Error;
      
      // Se é o último attempt ou erro não é de rede, joga o erro
      if (attempt === API_CONFIG.RETRY_ATTEMPTS || 
          (error as Error).name === 'AbortError') {
        break;
      }
      
      // Aguarda antes de tentar novamente (backoff exponencial)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  
  throw lastError || new Error('Falha na requisição após várias tentativas');
};