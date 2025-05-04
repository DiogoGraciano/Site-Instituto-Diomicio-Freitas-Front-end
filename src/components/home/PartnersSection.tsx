import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Partner } from '../../types';

interface PartnersSectionProps {
  partners: Partner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
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
        {partners.map((partner) => (
          <SwiperSlide key={partner.id}>
            <div className="bg-white border border-gray-200 p-2 flex flex-col items-center">
              <div className="mb-2">
                <img src={partner.logo} alt={partner.name} className="w-24 h-16 object-contain" />
              </div>
              <h3 className="text-xs font-medium text-center">{partner.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
} 