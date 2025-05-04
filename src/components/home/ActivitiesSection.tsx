import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Activity } from '../../types';

interface ActivitiesSectionProps {
  activities: Activity[];
}

export default function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  return (
    <section className="py-8 px-4" id="atividades">
      <h2 className="text-lg font-semibold text-red-700 mb-4">Atividades</h2>
      
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{delay:3000}}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="mx-8"
        >
          {activities.map((activity) => (
            <SwiperSlide key={activity.id}>
              <div className="bg-white border border-gray-200 p-2">
                <div className="mb-2">
                  <img src={activity.image} alt={activity.title} className="w-full h-32 object-cover" />
                </div>
                <h3 className="text-sm font-medium">{activity.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full p-1 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </div>
        
        <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-1 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </div>
    </section>
  );
} 