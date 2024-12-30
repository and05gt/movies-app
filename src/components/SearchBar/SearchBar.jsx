import { Field, Form, Formik } from "formik";
import style from "./SearchBar.module.css";
import { motion } from "framer-motion";
import { slideInFromLeft } from "../motion/motion.js";

const SearchBar = ({ handleChangeQuery }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values, actions) => {
    handleChangeQuery(values.query);
    actions.resetForm();
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={slideInFromLeft()}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={style.form}>
          <Field className={style.input} name="query" />
          <button className={style.formBtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </motion.div>
  );
};

export default SearchBar;
