import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { fetchPartners } from '../../services/api';
import { useEffect } from 'react';
import { useState } from 'react';
import { Partner } from '../../types';

export default function PartnersSection() {

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPartners = async () => {
      try {
        const data = await fetchPartners();
        setPartners(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setLoading(false);
      }
    };
    getPartners();
  }, []);

  return (
    <section className="py-8 px-4 bg-gray-50" id="parceiros">
      <h2 className="text-lg font-semibold text-red-700 mb-4">Parceiros</h2>
      
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={4}
        autoplay={{delay: 3000}}
        loop={true}
        navigation
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : (
          partners.map((partner) => (
          <SwiperSlide key={partner.id}>
            <div className="bg-white border border-gray-200 p-2 flex flex-col items-center">
              <div className="mb-2">
                <img src={partner.logo} alt={partner.name} className="w-24 h-16 object-contain" />
              </div>
              <h3 className="text-xs font-medium text-center">{partner.name}</h3>
            </div>
          </SwiperSlide>
        )))}
      </Swiper>
    </section>
  );
} 