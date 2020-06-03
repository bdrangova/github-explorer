import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import Explore from '@material-ui/icons/Explore';
import style from './style.module.css';

const messages = defineMessages({
  login: {
    id: 'login',
  },
  logout: {
    id: 'logout',
  },
});

const Navbar = ({ handleLogin, handleLogout, loggedIn }) => {
  const intl = useIntl();
  return (
    <AppBar position="relative" color="transparent">
      <Toolbar>
        <Link to="/" className={style.title}>
          <Explore fontSize="large" color="primary" />
          <Typography variant="h6">Github Explorer</Typography>
        </Link>
        {!loggedIn ? (
          <Button onClick={handleLogin}>
            {intl.formatMessage(messages.login)}
          </Button>
        ) : (
          <Button onClick={handleLogout}>
            {intl.formatMessage(messages.logout)}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Navbar;
