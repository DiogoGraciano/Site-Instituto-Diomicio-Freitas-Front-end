import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Banner from '../components/home/Banner';
import ActivitiesSection from '../components/home/ActivitiesSection';
import ProjectsSection from '../components/home/ProjectsSection';
import PartnersSection from '../components/home/PartnersSection';
import ContactForm from '../components/home/ContactForm';
import { Activity, Project, Partner } from '../types';

export default function HomePage() {
  // Mock data for carousels
  const activities: Activity[] = Array(8).fill(0).map((_, i) => ({
    id: `activity-${i}`,
    title: `Atividade ${i + 1}`,
    image: `https://placehold.co/300x200`
  }));

  const projects: Project[] = Array(6).fill(0).map((_, i) => ({
    id: `project-${i}`,
    title: `Projeto ${i + 1}`,
    description: 'Explicação do projeto',
    image: `https://placehold.co/300x200`
  }));

  const partners: Partner[] = Array(8).fill(0).map((_, i) => ({
    id: `partner-${i}`,
    name: `Amigo ${i + 1}`,
    logo: `https://placehold.co/150x100`
  }));

  return (
    <div className="font-['Montserrat'] w-full text-gray-800 bg-white shadow-lg">
      <Header />
      <Banner />
      <ActivitiesSection activities={activities} />
      <ProjectsSection projects={projects} />
      <PartnersSection partners={partners} />
      <ContactForm />
      <Footer />
    </div>
  );
} 