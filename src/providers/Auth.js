import React, { useState } from 'react';
import { FirebaseService } from 'src/services/firebase';
import { LocalStorageService } from 'src/services/storage';

export const FirebaseAuth = React.createContext();

const AuthProvider = (props) => {
  const [token, setToken] = useState(LocalStorageService.getToken());

  const handleLogin = async () => {
    const token = await FirebaseService.githubAuth();
    LocalStorageService.storeToken(token);
    setToken(token);
  };

  const handleLogout = async () => {
    const response = await FirebaseService.githubSignout();
    if (response.status === 'ok') {
      LocalStorageService.removeToken();
      setToken(null);
    }
  };

  return (
    <FirebaseAuth.Provider
      value={{
        handleLogin,
        handleLogout,
        token,
      }}
    >
      {props.children}
    </FirebaseAuth.Provider>
  );
};

export default AuthProvider;
