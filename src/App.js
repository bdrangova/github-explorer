import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthProvider from 'src/providers/Auth';
import HomePage from './pages/homePage';
import RepositoryPage from './pages/repositoryPage';
import HeaderContainer from 'src/containers/Header';
import './global.css';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HeaderContainer />
        <main>
          <Switch>
            <Route path="/repos/:owner/:repo">
              <RepositoryPage />
            </Route>
            <Route path="/login">
              <HomePage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
