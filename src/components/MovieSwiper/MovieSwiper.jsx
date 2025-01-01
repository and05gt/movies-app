import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow } from "swiper/modules";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { slideInFromBot } from "../motion/motion.js";

const MovieSwiper = ({ slides }) => {
  const location = useLocation();

  return (
    <motion.div initial="hidden" animate="visible" variants={slideInFromBot()}>
      <Swiper
        effect={"coverflow"}
        slidesPerView={"auto"}
        centeredSlides={true}
        grabCursor={true}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        modules={[EffectCoverflow]}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link to={`/movies/${slide.id.toString()}`} state={location}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${slide.poster_path}`}
                alt={slide.title}
                loading="lazy"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default MovieSwiper;
