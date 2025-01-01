import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { fetchMoviesById } from "../../services/api";
import style from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { motion } from "framer-motion";
import { slideInFromLeft } from "../../motion/motion.js";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");
  const [movie, setMovie] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(() => {
    const savedLang = window.localStorage.getItem("language");
    if (savedLang !== null) {
      return savedLang;
    }
    return language;
  });

  useEffect(() => {
    window.localStorage.setItem("language", language);
  }, [language]);

  const handleChangeLanguage = () => {
    if (language === "en-US") {
      setLanguage("uk-UK");
    } else {
      setLanguage("en-US");
    }
  };

  useEffect(() => {
    if (!movieId) return;

    const getMovieDetails = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMoviesById(movieId, language);
        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId, language]);

  if (!movie) return <Loader />;

  const { genres } = movie;

  return (
    <div className={style.detailsContainer}>
      <button
        className={style.langToggleBtn}
        type="button"
        onClick={handleChangeLanguage}
      >
        {language === "en-US" ? "UA" : "EN"}
      </button>

      <Link className={style.linkBack} to={backLink.current}>
        Go back
      </Link>
      <img
        className={style.backdrop}
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInFromLeft()}
        className={style.movieSection}
      >
        <div className={style.movieInfo}>
          <h2>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h2>
          {movie.vote_average.toString().split(".").join("").slice(0, 2) <
          50 ? (
            <p className={style.scoreRed}>
              {movie.vote_average.toString().split(".").join("").slice(0, 2)}%
            </p>
          ) : (
            <p className={style.scoreGreen}>
              {movie.vote_average.toString().split(".").join("").slice(0, 2)}%
            </p>
          )}
          <p className={style.overviewText}>{movie.overview}</p>
          <ul className={style.genresList}>
            {genres.map((genre) => (
              <li className={style.genresListItem} key={genre.id}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.wrapper}>
          <div className={style.wrapperLink}>
            <Link className={style.link} to="cast">
              Cast
            </Link>
            <Link className={style.link} to="reviews">
              Reviews
            </Link>
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default MovieDetailsPage;
