import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/swiper-bundle.css";
import swiper1 from "../assets/swiper1.jpg";
import swiper2 from "../assets/swiper2.jpg";
import swiper3 from "../assets/swiper3.jpeg";

import { useNavigate } from "react-router-dom";

export const swiperData = [
  {
    title: "KIDS COLLECTION",
    info: "Explore our Kids Collection at LOGANCEE – a whimsical world of joy and comfort. From adorable clothing to playful toys, find delightful essentials that spark imagination and make childhood magical.",
    image: swiper1,
  },
  {
    title: "MEN COLLECTION",
    info: "Discover timeless sophistication in our Men's Collection at LOGANCEE. Elevate your style with curated fashion and accessories, showcasing quality craftsmanship and modern trends. Explore and redefine your wardrobe today.",
    image: swiper2,
  },
  {
    title: "WOMEN COLLECTION",
    info: "Indulge in elegance at LOGANCEE's Women's Collection. Uncover a curated selection of chic fashion and accessories, blending trendsetting styles with timeless classics. Redefine your wardrobe and embrace your unique expression.",
    image: swiper3,
  },
];

function MainSwiper() {
  const navigate = useNavigate();
  return (
    <Swiper
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
    >
      {swiperData.map((slide, index) => (
        <SwiperSlide key={slide.title} className="lg:h-screen">
          <div className="relative ">
            <div className=" absolute max-w-sm md:max-w-xl top-1/2 md:ml-8 -translate-y-1/2 p-8">
              <h1 className="md:text-4xl text-sm font-bold text-pblack ">
                {slide.title}
              </h1>
              <hr className=" h-1 md:h-1.5 max-xs:max-w-[3rem]  max-w-[8rem] md:mt-5 mt-2 mb:4 md:mb-8 border-none bg-pblack" />
              <p className="max-sm:hidden">{slide.info}</p>
              <button
                onClick={() => navigate("/shop")}
                className="bg-pblack text-white px-2 md:px-4 py-2 mt-4 text-sm md:text-lg"
              >
                Shop Now
              </button>
            </div>
            <img src={slide.image} alt="" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MainSwiper;
