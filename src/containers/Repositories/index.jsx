import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RepositoryProps, PagerProps } from 'src/services/proptypes';
import { FirebaseAuth } from 'src/providers/Auth';
import { fetchPage, changePage } from 'src/store/actions';
import { getReposByPage } from '../../store/reducers/repositories';
import RepoList from 'src/components/RepositoriesList';
import ErrorMessage from 'src/components/ErrorMessage';

const RepositoriesContainer = ({
  state,
  currentRepos,
  loading,
  error,
  duration,
  success,
  dispatch,
}) => {
  const { token } = useContext(FirebaseAuth);
  const { pager, repos } = state;
  const [layout, setLayout] = useState(true);

  const handlePageChange = (event, page) => {
    if (getReposByPage(page, state).length === 0) {
      dispatch(fetchPage(page, pager, repos.query, token));
    } else {
      dispatch(changePage(page, pager));
    }
  };

  const handleLayoutChange = (name) => {
    setLayout(name === 'grid');
  };

  if (success && currentRepos.length === 0) {
    return <ErrorMessage error={'no-results'} duration={duration} />;
  }

  return error === null ? (
    <RepoList
      repos={currentRepos}
      grid={layout}
      setLayout={handleLayoutChange}
      handlePageChange={handlePageChange}
      pager={pager}
      loading={loading}
      duration={duration}
    />
  ) : (
    <ErrorMessage
      error={error?.error}
      message={error?.message}
      duration={error?.duration}
    />
  );
};

RepositoriesContainer.propTypes = {
  state: PropTypes.shape({
    repos: PropTypes.shape({
      query: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(RepositoryProps),
    }).isRequired,
    pager: PagerProps.isRequired,
    api: PropTypes.object,
  }).isRequired,
  currentRepos: PropTypes.arrayOf(RepositoryProps).isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    error: PropTypes.string,
    message: PropTypes.string,
    duration: PropTypes.string,
  }),
  duration: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

RepositoriesContainer.defaultProps = {
  duration: null,
  error: {
    error: '',
    message: '',
    duration: '',
  },
  state: {
    repos: {
      items: [],
    },
    api: {},
  },
};

const mapStateToProps = (state) => {
  const { pager, api } = state;
  return {
    state,
    currentRepos: getReposByPage(pager.current, state),
    loading: api.loading ? true : false,
    success: api.success ? true : false,
    error: api.error ? api : null,
    duration: api.duration,
  };
};

export default connect(mapStateToProps)(RepositoriesContainer);
