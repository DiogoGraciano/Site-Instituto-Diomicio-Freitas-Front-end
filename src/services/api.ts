import { 
  History, 
  BlogPost, 
  BlogListResponse, 
  Activity, 
  Partner, 
  Project,
  Contact,
  ContactCreateDto,
  CreateHistoryDto
} from '../types';
import { API_CONFIG } from '../config/api';

// ============= ACTIVITIES =============
export const fetchActivities = async (): Promise<Activity[]> => {
  try {
    const response = await apiRequest<Activity[]>('/activities');
    return response;
  } catch (error) {
    console.error('Erro ao buscar atividades:', error);
    throw new Error(handleApiError(error));
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
    
    const response = await apiRequest<BlogListResponse>(endpoint);
    
    return {
      posts: response.posts,
      totalPages: response.totalPages,
      currentPage: response.currentPage
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
      return null;
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
    throw new Error(handleApiError(error));
  }
};

export const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.BASE_URL}/contacts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    throw new Error(handleApiError(error));
  }
};

export const fetchContactById = async (id: string): Promise<Contact> => {
  try {
    const response = await apiRequest<Contact>(`/contacts/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao buscar contato:', error);
    throw new Error(handleApiError(error));
  }
};

export const deleteContact = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await fetch(`${API_CONFIG.BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Erro ao deletar contato:', error);
    throw new Error(handleApiError(error));
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
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    
    return response.url;
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    throw new Error(handleApiError(error));
  }
};

// ============= UTILITÁRIOS =============
export const healthCheck = async (): Promise<{ status: string; timestamp: string }> => {
  try {
    const response = await apiRequest<{ status: string; timestamp: string }>('/');
    return response;
  } catch (error) {
    console.error('Erro no health check:', error);
    throw new Error(handleApiError(error));
  }
};

// ============= POSTS - CRUD OPERATIONS =============
export const createPost = async (formData: FormData): Promise<BlogPost> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar post:', error);
    throw new Error(handleApiError(error));
  }
};

export const updatePost = async (id: string, formData: FormData): Promise<BlogPost> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.BASE_URL}/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    throw new Error(handleApiError(error));
  }
};

export const deletePost = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await fetch(`${API_CONFIG.BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    throw new Error(handleApiError(error));
  }
};

// ============= ACTIVITIES - CRUD OPERATIONS =============
export const createActivity = async (formData: FormData): Promise<Activity> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.BASE_URL}/activities`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar atividade:', error);
    throw new Error(handleApiError(error));
  }
};

export const updateActivity = async (id: string, formData: FormData): Promise<Activity> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.BASE_URL}/activities/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error);
    throw new Error(handleApiError(error));
  }
};

export const deleteActivity = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await fetch(`${API_CONFIG.BASE_URL}/activities/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Erro ao deletar atividade:', error);
    throw new Error(handleApiError(error));
  }
};

// ============= PROJECTS - CRUD OPERATIONS =============
export const createProject = async (formData: FormData): Promise<Project> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    throw new Error(handleApiError(error));
  }
};

export const updateProject = async (id: string, formData: FormData): Promise<Project> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.BASE_URL}/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    throw new Error(handleApiError(error));
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await fetch(`${API_CONFIG.BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    throw new Error(handleApiError(error));
  }
};

// ============= PARTNERS - CRUD OPERATIONS =============
export const createPartner = async (formData: FormData): Promise<Partner> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.BASE_URL}/partners`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar parceiro:', error);
    throw new Error(handleApiError(error));
  }
};

export const updatePartner = async (id: string, formData: FormData): Promise<Partner> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.BASE_URL}/partners/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar parceiro:', error);
    throw new Error(handleApiError(error));
  }
};

export const deletePartner = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    await fetch(`${API_CONFIG.BASE_URL}/partners/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Erro ao deletar parceiro:', error);
    throw new Error(handleApiError(error));
  }
};

// ============= HISTORY - CRUD OPERATIONS =============
export const createHistory = async (historyData: CreateHistoryDto): Promise<History> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.BASE_URL}/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(historyData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar histórico:', error);
    throw new Error(handleApiError(error));
  }
};

export const updateHistory = async (id: string, historyData: Partial<CreateHistoryDto>): Promise<History> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.BASE_URL}/history/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(historyData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar histórico:', error);
    throw new Error(handleApiError(error));
  }
};

export const deleteHistory = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_CONFIG.BASE_URL}/history/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error('Erro ao deletar histórico:', error);
    throw new Error(handleApiError(error));
  }
};

// ============= TRATAMENTO DE ERROS =============
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    const errorMessage = error.message;
    
    try {
      if (errorMessage.includes('HTTP') && errorMessage.includes(':')) {
        const parts = errorMessage.split(':');
        if (parts.length >= 2) {
          const responseBody = parts.slice(1).join(':').trim();
          
          if (responseBody.startsWith('{') || responseBody.startsWith('[')) {
            const parsed = JSON.parse(responseBody);
            
            if (Array.isArray(parsed)) {
              return parsed.map(err => 
                typeof err === 'string' ? err : 
                err.message || err.error || String(err)
              ).join('\n');
            }
            
            if (parsed.errors && Array.isArray(parsed.errors)) {
              return parsed.errors.map((err: any) => 
                typeof err === 'string' ? err : 
                err.message || err.error || String(err)
              ).join('\n');
            }
            
            if (parsed.message && Array.isArray(parsed.message)) {
              return parsed.message.map((msg: any) => 
                typeof msg === 'string' ? msg : String(msg)
              ).join('\n');
            }
            
            if (parsed.message) {
              return parsed.message;
            }
            if (parsed.error) {
              return parsed.error;
            }
          }
        }
      }
    } catch {
    }
    
          if (errorMessage.includes('HTTP 400')) {
        return 'Dados inválidos.\nVerifique as informações enviadas.';
      }
      
      if (errorMessage.includes('HTTP 401')) {
        return 'Não autorizado.\nFaça login novamente.';
      }
      
      if (errorMessage.includes('HTTP 403')) {
        return 'Acesso negado.\nVocê não tem permissão para esta ação.';
      }
      
      if (errorMessage.includes('HTTP 404')) {
        return 'Recurso não encontrado.';
      }
      
      if (errorMessage.includes('HTTP 409')) {
        return 'Conflito.\nEste recurso já existe ou está sendo utilizado.';
      }
      
      if (errorMessage.includes('HTTP 422')) {
        return 'Dados inválidos.\nVerifique os campos obrigatórios.';
      }
      
      if (errorMessage.includes('HTTP 429')) {
        return 'Muitas tentativas.\nTente novamente em alguns minutos.';
      }
      
      if (errorMessage.includes('HTTP 500')) {
        return 'Erro interno do servidor.\nTente novamente mais tarde.';
      }
      
      if (errorMessage.includes('HTTP 502') || errorMessage.includes('HTTP 503')) {
        return 'Serviço temporariamente indisponível.\nTente novamente em alguns minutos.';
      }
    
    if (errorMessage.includes('Failed to fetch') || 
        errorMessage.includes('NetworkError') ||
        errorMessage.includes('ERR_NETWORK')) {
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    }
    
    if (errorMessage.includes('AbortError') || 
        errorMessage.includes('timeout')) {
      return 'Tempo limite excedido. Tente novamente.';
    }
    
    if (errorMessage.includes('CORS')) {
      return 'Erro de política de segurança. Entre em contato com o suporte.';
    }
    
    if (errorMessage.includes('Falha ao') || 
        errorMessage.includes('Erro ao') ||
        errorMessage.includes('Não foi possível')) {
      return errorMessage;
    }
    
    if (errorMessage.includes('HTTP')) {
      return 'Erro no servidor. Tente novamente mais tarde.';
    }
    
    return errorMessage;
  }
  
  if (typeof error === 'object' && error !== null) {
    const errorObj = error as any;
    
    if (Array.isArray(error)) {
      return error.map(err => 
        typeof err === 'string' ? err : 
        err.message || err.error || String(err)
      ).join('\n');
    }
    
    if (errorObj.errors && Array.isArray(errorObj.errors)) {
      return errorObj.errors.map((err: any) => 
        typeof err === 'string' ? err : 
        err.message || err.error || String(err)
      ).join('\n');
    }
    
    if (errorObj.message && Array.isArray(errorObj.message)) {
      return errorObj.message.map((msg: any) => 
        typeof msg === 'string' ? msg : String(msg)
      ).join('\n');
    }
    
    if (errorObj.message) {
      return handleApiError(new Error(errorObj.message));
    }
    
    if (errorObj.error) {
      return handleApiError(new Error(errorObj.error));
    }
    
    if (errorObj.status) {
      return handleApiError(new Error(`HTTP ${errorObj.status}`));
    }
    
    try {
      const serialized = JSON.stringify(errorObj);
      if (serialized !== '{}') {
        return `Erro: ${serialized}`;
      }
    } catch {
    }
  }
  
  if (typeof error === 'string') {
    return handleApiError(new Error(error));
  }
  
  return 'Ocorreu um erro inesperado. Tente novamente.';
};

export const getErrorMessage = handleApiError;

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
      
      if (attempt === API_CONFIG.RETRY_ATTEMPTS || 
          (error as Error).name === 'AbortError') {
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  
  throw lastError || new Error('Falha na requisição após várias tentativas');
};