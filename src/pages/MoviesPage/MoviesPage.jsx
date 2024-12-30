import { useState, useEffect, useMemo } from "react";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { fetchSearchByQuery } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import style from "./MoviesPage.module.css";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getMoviesByQuery = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchSearchByQuery(query, page);
        setMovies((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMoviesByQuery();
  }, [query, page]);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      return setSearchParams({});
    }
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  const filteredMovies = useMemo(
    () =>
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      ),
    [movies, query]
  );

  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className={style.moviesContainer}>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      <MovieList movies={filteredMovies} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {page < totalPages && <LoadMoreBtn onClick={handleChangePage} />}
    </div>
  );
};

export default MoviesPage;
