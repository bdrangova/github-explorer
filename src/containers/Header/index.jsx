import React, { useContext } from 'react';
import Navbar from 'src/components/Navbar';
import { FirebaseAuth } from 'src/providers/Auth';

const HeaderContainer = () => {
  const { token, handleLogin, handleLogout } = useContext(
    FirebaseAuth,
  );

  return (
    <Navbar
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      loggedIn={token !== null}
    />
  );
};

export default HeaderContainer;
