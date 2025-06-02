import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { fetchActivities } from "../../services/api";
import { useEffect } from "react";
import { useState } from "react";
import { Activity } from "../../types";

export default function ActivitiesSection() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const data = await fetchActivities();
        setActivities(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    getActivities();
  }, []);

  return (
    <section className="py-8 px-4" id="atividades">
      <h2 className="text-lg font-semibold text-red-700 mb-4">Atividades</h2>

      <div className="relative">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
          </div>
        ) : (
          <>
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={3}
              autoplay={{ delay: 3000 }}
              loop={true}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              className="mx-8"
            >
              {activities.map((activity) => (
                <SwiperSlide key={activity.id}>
                  <div className="bg-white border border-gray-200 p-2">
                    <div className="mb-2">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-medium">{activity.title}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full p-1 z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-700"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>

            <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-1 z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-700"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
