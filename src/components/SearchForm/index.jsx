import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import {
  TextField,
  Container,
  InputAdornment,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import style from './style.module.css';

const messages = defineMessages({
  search: {
    id: 'search.github.placeholder',
  },
});

const SearchForm = ({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setSubmitting,
  AutoSubmit,
  submitForm,
}) => {
  const intl = useIntl();
  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className={style.form}
        data-testid="search-form"
      >
        <TextField
          type="text"
          name="search"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.search}
          variant="outlined"
          placeholder={intl.formatMessage(messages.search)}
          fullWidth
          helperText={errors.search}
          error={errors.search && true}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <AutoSubmit
          values={values}
          setSubmitting={setSubmitting}
          submitForm={submitForm}
        />
      </form>
    </Container>
  );
};

SearchForm.propTypes = {
  values: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
