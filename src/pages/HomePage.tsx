import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Banner from '../components/home/Banner';
import ActivitiesSection from '../components/home/ActivitiesSection';
import ProjectsSection from '../components/home/ProjectsSection';
import PartnersSection from '../components/home/PartnersSection';
import ContactForm from '../components/home/ContactForm';

export default function HomePage() {
  return (
    <div className="font-['Montserrat'] w-full text-gray-800 bg-white shadow-lg">
      <Header />
      <Banner />
      <ActivitiesSection/>
      <ProjectsSection/>
      <PartnersSection/>
      <ContactForm />
      <Footer />
    </div>
  );
} 