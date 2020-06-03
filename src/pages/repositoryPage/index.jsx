import React from 'react';
import { useLocation } from 'react-router-dom';
import RepositoryDisplay from 'src/containers/RepositoryDisplay';

const RepositoryPage = () => {
  const location = useLocation();
  return <RepositoryDisplay location={location} />;
};

export default RepositoryPage;
