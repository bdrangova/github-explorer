import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import style from './style.module.css';

const Paging = ({ pager, handleChange, disabled }) => {
  return (
    <Box className={style.container}>
      <Pagination
        count={pager.last}
        siblingCount={2}
        onChange={handleChange}
        page={pager.current}
        disabled={disabled}
        color="primary"
      />
    </Box>
  );
};

Paging.propTypes = {
  pager: PropTypes.shape({
    last: PropTypes.number,
    current: PropTypes.number,
  }).isRequired,
  handleLogin: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Paging;
