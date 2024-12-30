import { Link, useLocation } from "react-router-dom";
import style from "./MovieList.module.css";
import { motion } from "framer-motion";
import { slideInFromRight } from "../motion/motion.js";

const MovieList = ({ movies }) => {
  const location = useLocation();

  if (!movies) return;

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div className={style.container}>
      <ul className={style.movieList}>
        {movies.map((movie) => (
          <motion.li
            initial="hidden"
            animate="visible"
            variants={slideInFromRight()}
            key={movie.id}
            className={style.movieItem}
          >
            <Link
              className={style.movieLink}
              to={`/movies/${movie.id.toString()}`}
              state={location}
            >
              <img
                className={style.movieImage}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                    : defaultImg
                }
                alt={movie.title}
              />
              <p className={style.movieTitle}>{movie.title}</p>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
