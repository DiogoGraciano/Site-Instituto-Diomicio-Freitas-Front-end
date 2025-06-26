import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Banner from '../components/home/Banner';
import ActivitiesSection from '../components/home/ActivitiesSection';
import ProjectsSection from '../components/home/ProjectsSection';
import PartnersSection from '../components/home/PartnersSection';
import ContactForm from '../components/home/ContactForm';

export default function HomePage() {
  return (
    <div className="font-['Montserrat'] w-full text-gray-800 bg-gradient-to-br from-gray-50 via-blue-50 to-red-50 min-h-screen">
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/90 shadow-lg border-b border-gray-200/50">
        <Header />
      </div>
      
      <div className="relative">
        <Banner />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-red-600/10 pointer-events-none"></div>
      </div>
      
      <main className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 space-y-16 py-8">
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl mx-4 md:mx-8 lg:mx-16 p-6 md:p-8 border border-gray-200/50 hover:shadow-xl transition-shadow duration-300">
            <ActivitiesSection/>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-red-600 rounded-full blur-2xl"></div>
            </div>
            <div className="relative z-10 mx-4 md:mx-8 lg:mx-16">
              <ProjectsSection/>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl mx-4 md:mx-8 lg:mx-16 p-6 md:p-8 border border-gray-200/50 hover:shadow-xl transition-shadow duration-300">
            <PartnersSection/>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-red-600 py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="relative z-10 mx-4 md:mx-8 lg:mx-16">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-red-600/20"></div>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
} 