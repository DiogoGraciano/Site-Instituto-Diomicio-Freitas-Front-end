import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getProfile } from '../services/auth';
import AdminLayout from '../components/admin/AdminLayout';
import EntityManager from '../components/admin/EntityManager';
import FormModal from '../components/admin/FormModal';
import {
  // Posts
  fetchBlogPosts,
  createPost,
  updatePost,
  deletePost,
  // Activities
  fetchActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  // Projects
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  // Partners
  fetchPartners,
  createPartner,
  updatePartner,
  deletePartner,
  // History
  fetchHistoryData,
  createHistory,
  updateHistory,
  deleteHistory,
  // Contacts
  fetchContacts,
  deleteContact,
} from '../services/api';
import {
  BlogPost,
  Activity,
  Project,
  Partner,
  History,
  Contact
} from '../types';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
  } | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Data states
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [history, setHistory] = useState<History[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserLoading(true);
      getProfile(token)
        .then((userData) => {
          setUser(userData);
          setUserLoading(false);
        })
        .catch(() => {
          setUserLoading(false);
          logout();
        });
    } else {
      setUserLoading(false);
      logout();
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const getErrorMessage = (error: any): string => {
    // Se o erro tem uma resposta da API
    if (error?.response?.data) {
      const data = error.response.data;
      
      // Se tem uma mensagem específica
      if (data.message) {
        return data.message;
      }
      
      // Se tem um array de erros
      if (data.errors) {
        if (Array.isArray(data.errors)) {
          return data.errors.join(', ');
        }
        if (typeof data.errors === 'object') {
          return Object.values(data.errors).flat().join(', ');
        }
      }
      
      // Se tem erro como string
      if (data.error) {
        return data.error;
      }
    }
    
    // Se o erro tem uma mensagem direta
    if (error?.message) {
      return error.message;
    }
    
    // Mensagem padrão
    return 'Erro interno do servidor. Tente novamente.';
  };

  const loadData = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      switch (activeTab) {
        case 'posts':
          const postsData = await fetchBlogPosts(1, 100);
          setPosts(postsData.posts);
          break;
        case 'activities':
          const activitiesData = await fetchActivities();
          setActivities(activitiesData);
          break;
        case 'projects':
          const projectsData = await fetchProjects();
          setProjects(projectsData);
          break;
        case 'partners':
          const partnersData = await fetchPartners();
          setPartners(partnersData);
          break;
        case 'history':
          const historyData = await fetchHistoryData();
          setHistory(historyData);
          break;
        case 'contacts':
          const contactsData = await fetchContacts();
          setContacts(contactsData);
          break;
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setErrorMessage(`Erro ao carregar dados: ${getErrorMessage(error)}`);
    } finally {
      setLoading(false);
    }
  };

  // Form field configurations
  const getFormFields = (type: string) => {
    switch (type) {
      case 'posts':
        return [
          { name: 'title', label: 'Título', type: 'text' as const, required: true },
          { name: 'slug', label: 'Slug', type: 'text' as const, required: true },
          { name: 'excerpt', label: 'Resumo', type: 'textarea' as const, required: true },
          { name: 'content', label: 'Conteúdo', type: 'textarea' as const, required: true },
          { name: 'author', label: 'Autor', type: 'text' as const, required: true },
          { name: 'category', label: 'Categoria', type: 'text' as const, required: true },
          { name: 'tags', label: 'Tags', type: 'array' as const },
          { name: 'image', label: 'Imagem', type: 'file' as const, accept: 'image/*' },
        ];
      case 'activities':
        return [
          { name: 'title', label: 'Título', type: 'text' as const, required: true },
          { name: 'image', label: 'Imagem', type: 'file' as const, accept: 'image/*' },
        ];
      case 'projects':
        return [
          { name: 'title', label: 'Título', type: 'text' as const, required: true },
          { name: 'description', label: 'Descrição', type: 'textarea' as const, required: true },
          { name: 'image', label: 'Imagem', type: 'file' as const, accept: 'image/*' },
        ];
      case 'partners':
        return [
          { name: 'name', label: 'Nome', type: 'text' as const, required: true },
          { name: 'logo', label: 'Logo', type: 'file' as const, accept: 'image/*' },
        ];
      case 'history':
        return [
          { name: 'title', label: 'Título', type: 'text' as const, required: true },
          { name: 'foundationYear', label: 'Ano de Fundação', type: 'text' as const, placeholder: 'Ex: 1998' },
          { name: 'content', label: 'Conteúdo', type: 'array' as const, placeholder: 'Parágrafo do histórico' },
          { name: 'milestones', label: 'Marcos Históricos', type: 'milestones' as const },
        ];
      default:
        return [];
    }
  };

  // Handle history form submissions with JSON data
  const handleHistorySubmit = async (data: Record<string, any>) => {
    setFormLoading(true);
    try {
      // Filtrar campos vazios e preparar dados
      const historyData: any = {
        title: data.title || '',
        foundationYear: data.foundationYear || '',
      };

      // Adicionar content apenas se não estiver vazio
      if (data.content && Array.isArray(data.content)) {
        const filteredContent = data.content.filter((item: string) => item.trim() !== '');
        if (filteredContent.length > 0) {
          historyData.content = filteredContent;
        }
      }

      // Adicionar milestones apenas se não estiver vazio
      if (data.milestones && Array.isArray(data.milestones)) {
        const filteredMilestones = data.milestones.filter((milestone: any) =>
          milestone.year.trim() !== '' && milestone.event.trim() !== ''
        );
        if (filteredMilestones.length > 0) {
          historyData.milestones = filteredMilestones;
        }
      }

      if (editingItem) {
        await updateHistory(editingItem.id, historyData);
      } else {
        await createHistory(historyData);
      }

      await loadData();
      setModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  // Handle form submissions
  const handleSubmit = async (formData: FormData) => {
    setFormLoading(true);
    try {
      if (editingItem) {
        switch (activeTab) {
          case 'posts':
            await updatePost(editingItem.id, formData);
            break;
          case 'activities':
            await updateActivity(editingItem.id, formData);
            break;
          case 'projects':
            await updateProject(editingItem.id, formData);
            break;
          case 'partners':
            await updatePartner(editingItem.id, formData);
            break;
        }
      } else {
        switch (activeTab) {
          case 'posts':
            await createPost(formData);
            break;
          case 'activities':
            await createActivity(formData);
            break;
          case 'projects':
            await createProject(formData);
            break;
          case 'partners':
            await createPartner(formData);
            break;
        }
      }

      await loadData();
      setModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteLoading(true);
    setErrorMessage('');
    try {
      switch (activeTab) {
        case 'posts':
          await deletePost(id);
          break;
        case 'activities':
          await deleteActivity(id);
          break;
        case 'projects':
          await deleteProject(id);
          break;
        case 'partners':
          await deletePartner(id);
          break;
        case 'history':
          await deleteHistory(id);
          break;
        case 'contacts':
          await deleteContact(id);
          break;
      }
      
      await loadData();
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      setErrorMessage(`Erro ao deletar item: ${getErrorMessage(error)}`);
    } finally {
      setDeleteLoading(false);
    }
  };

  const renderTableRow = (item: any) => {
    switch (activeTab) {
      case 'posts':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.category}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.author}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(item.createdAt || item.date).toLocaleDateString('pt-BR')}
            </td>
          </>
        );
      case 'activities':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.image && (
                <img src={item.image} alt={item.title} className="h-10 w-10 rounded object-cover" />
              )}
            </td>
          </>
        );
      case 'projects':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.title}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
              {item.description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.image && (
                <img src={item.image} alt={item.title} className="h-10 w-10 rounded object-cover" />
              )}
            </td>
          </>
        );
      case 'partners':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.logo && (
                <img src={item.logo} alt={item.name} className="h-10 w-10 rounded object-cover" />
              )}
            </td>
          </>
        );
      case 'history':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.foundationYear || '-'}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
              {item.content ? `${item.content.length} parágrafo(s)` : '-'}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
              {item.milestones ? `${item.milestones.length} marco(s)` : '-'}
            </td>
          </>
        );
      case 'contacts':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {item.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.phone}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.subject}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
              {item.message}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(item.createdAt).toLocaleDateString('pt-BR')}
            </td>
          </>
        );
      default:
        return null;
    }
  };

  const getTableColumns = () => {
    switch (activeTab) {
      case 'posts':
        return ['Título', 'Categoria', 'Autor', 'Data'];
      case 'activities':
        return ['Título', 'Imagem'];
      case 'projects':
        return ['Título', 'Descrição', 'Imagem'];
      case 'partners':
        return ['Nome', 'Logo'];
      case 'history':
        return ['Título', 'Ano Fundação', 'Conteúdo', 'Marcos'];
      case 'contacts':
        return ['Nome', 'Telefone', 'Assunto', 'Mensagem', 'Data'];
      default:
        return [];
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'posts':
        return posts;
      case 'activities':
        return activities;
      case 'projects':
        return projects;
      case 'partners':
        return partners;
      case 'history':
        return history;
      case 'contacts':
        return contacts;
      default:
        return [];
    }
  };

  const getModalTitle = () => {
    const titles = {
      posts: 'Post',
      activities: 'Atividade',
      projects: 'Projeto',
      partners: 'Parceiro',
      history: 'Histórico',
      contacts: 'Contato',
    };
    return `${editingItem ? 'Editar' : 'Adicionar'} ${titles[activeTab as keyof typeof titles]}`;
  };

  const getTableTitle = () => {
    const titles = {
      posts: 'Post',
      activities: 'Atividade',
      projects: 'Projeto',
      partners: 'Parceiro',
      history: 'Histórico',
      contacts: 'Contato',
    };
    return `Gerenciar ${titles[activeTab as keyof typeof titles]}`;
  };

  if (userLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Erro ao carregar usuário</div>;
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-4 mx-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Erro</h3>
              <p className="mt-1 text-sm text-red-700 whitespace-pre-line">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage('')}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <EntityManager
        title={getTableTitle()}
        data={getCurrentData()}
        loading={loading}
        deleteLoading={deleteLoading}
        onAdd={activeTab !== 'contacts' ? () => setModalOpen(true) : undefined}
        onEdit={activeTab !== 'contacts' ? (item) => {
          setEditingItem(item);
          setModalOpen(true);
        } : undefined}
        onDelete={handleDelete}
        onRefresh={loadData}
        renderRow={renderTableRow}
        columns={getTableColumns()}
      />

      {modalOpen && activeTab !== 'contacts' && (
        <FormModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingItem(null);
          }}
          onSubmit={activeTab === 'history' ? () => Promise.resolve() : handleSubmit}
          onSubmitJson={activeTab === 'history' ? handleHistorySubmit : undefined}
          useJsonSubmit={activeTab === 'history'}
          title={getModalTitle()}
          fields={getFormFields(activeTab)}
          initialData={editingItem || {}}
          loading={formLoading}
        />
      )}
    </AdminLayout>
  );
};

export default Dashboard;