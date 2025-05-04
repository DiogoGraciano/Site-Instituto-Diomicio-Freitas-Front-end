import { Project } from '../../types';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="py-8 px-4 bg-gray-50" id="projetos">
      <h2 className="text-lg font-semibold text-red-700 mb-4">Projetos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white border border-gray-200 p-4">
            <div className="mb-3">
              <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
            </div>
            <h3 className="text-base font-medium mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 