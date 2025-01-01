import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCastById } from "../../services/api";
import style from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { slideInFromBot } from "../../motion/motion.js";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const getCast = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchCastById(movieId);
        setCasts(data.cast);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  if (!casts) return <Loader />;

  return (
    <motion.div initial="hidden" animate="visible" variants={slideInFromBot()}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      <Swiper
        slidesPerView={2}
        grabCursor={true}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1440: {
            slidesPerView: 8,
          },
        }}
        className={style.swiperCastWrapper}
      >
        {casts.map((cast) => (
          <SwiperSlide key={cast.id} className={style.swiperCastSlide}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`}
              alt={cast.name}
            />
            <p className={style.castItemName}>{cast.name}</p>
            <p>Character: {cast.character}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default MovieCast;
