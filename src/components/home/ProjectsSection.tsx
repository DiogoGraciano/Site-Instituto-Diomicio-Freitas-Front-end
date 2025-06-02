import { useState } from 'react';
import { useEffect } from 'react';
import { Project } from '../../types';
import { fetchProjects } from '../../services/api';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  return (
    <section className="py-8 px-4 bg-gray-50" id="projetos">
      <h2 className="text-lg font-semibold text-red-700 mb-4">Projetos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : (
          projects.map((project) => (
          <div key={project.id} className="bg-white border border-gray-200 p-4">
            <div className="mb-3">
              <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
            </div>
            <h3 className="text-base font-medium mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
          </div>
        )))}
      </div>
    </section>
  );
} 