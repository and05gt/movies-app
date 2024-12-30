import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsById } from "../../services/api";
import style from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { motion } from "framer-motion";
import { slideInFromBot } from "../motion/motion.js";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const getReviews = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchReviewsById(movieId);
        setReviews(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  if (!reviews) return <Loader />;

  return (
    <motion.div initial="hidden" animate="visible" variants={slideInFromBot()}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ul className={style.reviewList}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id}>
              <p className={style.reviewAuthor}>- Author: {review.author} -</p>
              <p className={style.reviewText}>{review.content}</p>
            </li>
          ))
        ) : (
          <p>We don&apos;t nave any reviews for this movie.</p>
        )}
      </ul>
    </motion.div>
  );
};

export default MovieReviews;
