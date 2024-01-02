import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/swiper-bundle.css";

import Card from "../../ui/Card";
import { useProducts } from "./useProducts";
function RelatedProducts({ category }) {
  const { isLoading, products } = useProducts(category, "product");
  if (isLoading) return null;
  return (
    <div>
      <h2 className="text-rblack font-bold text-2xl md:text-3xl my-10">
        RELATED PRODUCTS
      </h2>
      <Swiper
        autoplay={{ delay: 1000 }}
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={4}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
          },
          // when window width is >= 480px
          550: {
            slidesPerView: 2,
          },
          // when window width is >= 800px slide 3
          870: {
            slidesPerView: 3,
          },

          // when window width is >= 1200px
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {products?.map((product) => (
          <SwiperSlide key={product.id} className="flex justify-center">
            <Card product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default RelatedProducts;
