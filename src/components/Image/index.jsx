import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import style from './style.module.css';

const Image = ({ source }) => {
  return (
    <Avatar
      alt="repo image"
      src={`${source}`}
      className={style.image}
    />
  );
};

Image.propTypes = {
  source: PropTypes.string.isRequired,
};

export default Image;
