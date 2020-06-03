import React, { useContext } from 'react';
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
  return (
    <Formik
      validate={validate}
      validateOnChange={true}
      validateOnBlur={false}
      initialValues={{ search: query }}
      onSubmit={async (values, { setSubmitting }) => {
        dispatch(search(values.search, token));
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <SearchForm
          values={values}
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
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
