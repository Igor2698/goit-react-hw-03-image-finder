import React from 'react';
import { Formik, Form, Field } from 'formik';

import 'react-toastify/dist/ReactToastify.css';
import css from './SearchBar.module.css';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        query: '',
      }}
      onSubmit={(values, actions) => {
        // if (values.query.trim() === '') {
        //   toast.error('Please enter value of image');

        //   return;
        // }

        onSubmit(values);
        actions.resetForm();
      }}
    >
      <header className={css.headerForm}>
        <Form className={css.formSearchBar}>
          <button className={css.buttonForm} type="submit">
            <span>Search</span>
          </button>

          <Field
            className={css.inputForm}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
          />
        </Form>
      </header>
    </Formik>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
