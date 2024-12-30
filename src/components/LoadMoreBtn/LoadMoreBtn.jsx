import style from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={style.loadBtn} type="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
