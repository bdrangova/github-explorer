import React from 'react';
import SearchContainer from 'src/containers/Search';
import RepositoriesContainer from 'src/containers/Repositories';

const HomePage = () => {
  return (
    <>
      <SearchContainer />
      <RepositoriesContainer />
    </>
  );
};

export default HomePage;
