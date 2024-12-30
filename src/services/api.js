import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmJlZjlhYTRhYTUzYmQ0NTRhZDI0NmI4OGYyMzY1NiIsIm5iZiI6MTcyNzQ2ODc2NS40ODkzNTcsInN1YiI6IjY2ZjVhOWIxMDg3MDMxZjhmMmU1NzgwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bjI7_krv6nbpz5D-dh9x-CU_Kx5F5R3OTxHvileZjRg",
  },
};

export const fetchMovies = async () => {
  const { data } = await axios.get(
    `3/trending/movie/day?language=en-US`,
    options
  );
  return data;
};

export const fetchMoviesById = async (movieId, language = "en-US") => {
  const { data } = await axios.get(
    `3/movie/${movieId}?language=${language}`,
    options
  );
  return data;
};

export const fetchCastById = async (movieId) => {
  const { data } = await axios.get(
    `3/movie/${movieId}/credits?language=en-US`,
    options
  );
  return data;
};

export const fetchReviewsById = async (movieId) => {
  const { data } = await axios.get(
    `3/movie/${movieId}/reviews?language=en-US`,
    options
  );
  return data;
};

export const fetchSearchByQuery = async (query, page = 1) => {
  const { data } = await axios.get(
    `3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
    options
  );
  return data;
};
