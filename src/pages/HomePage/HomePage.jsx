import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import style from "./HomePage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieSwiper from "../../components/MovieSwiper/MovieSwiper";
import Banner from "../../components/Banner/Banner";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMovies();
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div className={style.homeContainer}>
      <p className={style.title}>Tranding today</p>
      {movies && movies.length > 0 && <Banner movies={movies} />}
      {movies && movies.length > 0 && <MovieSwiper slides={movies} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </div>
  );
};

export default HomePage;
