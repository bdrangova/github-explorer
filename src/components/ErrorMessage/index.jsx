import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { HourglassFull } from '@material-ui/icons';
import style from './style.module.css';

const messages = defineMessages({
  'no-results': {
    id: 'error.noResults',
  },
  'network-error': {
    id: 'error.networkError',
  },
  'no-readme': {
    id: 'error.noReadme',
  },
  unauthorized: {
    id: 'error.unauthorized',
  },
  seconds: {
    id: 'seconds',
  },
});

const ErrorMessage = ({ error, duration, message = '' }) => {
  const intl = useIntl();
  return (
    <Box className={style.error}>
      <Box className={style.duration}>
        <HourglassFull color="primary" fontSize="small" />
        <Typography variant="caption">
          {duration} {intl.formatMessage(messages.seconds)}
        </Typography>
      </Box>
      <Typography color="primary" variant="subtitle1">
        {message !== ''
          ? message
          : intl.formatMessage(messages[error])}
      </Typography>
    </Box>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.oneOf([
    'no-results',
    'network-error',
    'no-readme',
    'unautorized',
  ]).isRequired,
  duration: PropTypes.number.isRequired,
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: '',
};

export default ErrorMessage;
