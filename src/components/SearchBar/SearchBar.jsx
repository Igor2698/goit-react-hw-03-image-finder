import React from 'react';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        image: '',
      }}
      onSubmit={(values, actions) => {
        if (values.image.trim() === '') {
          toast.error('Please enter value of image');

          return;
        }

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
            name="image"
          />
        </Form>
      </header>
    </Formik>
  );
};
