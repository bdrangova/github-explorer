import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { FirebaseAuth } from 'src/providers/Auth';
import { search } from 'src/store/actions';
import SearchForm from 'src/components/SearchForm';

const SearchContainer = ({ query, dispatch }) => {
  const { token } = useContext(FirebaseAuth);
  const validate = (values) => {
    const errors = {};
    if (!values.search) {
      errors.search = 'Please enter a query';
    }
    return errors;
  };

  const AutoSubmit = ({ values, submitForm, setSubmitting }) => {
    const controller = new AbortController();
    const { signal } = controller;

    useEffect(() => {
      submitForm(values, setSubmitting, signal);
      return () => controller.abort();
    }, [values]);
    return null;
  };

  const submitForm = (values, setSubmitting, signal) => {
    if (values.search.length > 0) {
      dispatch(search(values.search, token, signal));
      setSubmitting(false);
    }
  };
  return (
    <Formik
      validate={validate}
      validateOnChange={true}
      validateOnBlur={false}
      initialValues={{ search: query }}
      onSubmit={async (values, { setSubmitting }) =>
        submitForm(values, setSubmitting)
      }
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setSubmitting,
      }) => (
        <SearchForm
          values={values}
          errors={errors}
          submitForm={submitForm}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
          AutoSubmit={AutoSubmit}
          setSubmitting={setSubmitting}
          submitForm={submitForm}
        />
      )}
    </Formik>
  );
};

SearchContainer.propTypes = {
  query: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { query } = state.repos;
  return {
    query,
  };
};

export default connect(mapStateToProps)(SearchContainer);
