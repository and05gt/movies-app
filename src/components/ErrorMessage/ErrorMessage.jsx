import style from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <h3 className={style.errorMsg}>:( Something went wrong! Try again!</h3>
  );
};

export default ErrorMessage;
