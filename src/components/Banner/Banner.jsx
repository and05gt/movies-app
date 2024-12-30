import style from "./Banner.module.css";

const Banner = ({ movies }) => {
  return (
    <div className={style.backdrop}>
      <img
        className={style.banner}
        src={`https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}`}
        alt={movies[0].title}
      />
    </div>
  );
};

export default Banner;
