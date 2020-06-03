import React, { useEffect, Suspense, useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RepositoryProps } from 'src/services/proptypes';
import { FirebaseAuth } from 'src/providers/Auth';
import { getRepoById } from 'src/store/reducers/repositories';
import { fetchRepo } from 'src/store/actions';
import RepositoryDetails from 'src/components/RepositoryDetails';
import Loading from 'src/components/Loading';
import ErrorMessage from 'src/components/ErrorMessage';
const MarkdownContainer = React.lazy(() =>
  import('src/containers/MarkdownContainer'),
);

const RepositoryDisplay = ({
  repositories,
  dispatch,
  location,
  loading,
  error,
}) => {
  const { token } = useContext(FirebaseAuth);
  useEffect(() => {
    if (Object.keys(repositories).length === 0) {
      dispatch(fetchRepo(location.pathname, token));
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error !== null) {
    return (
      <ErrorMessage
        status={error?.error}
        message={error?.message}
        duration={error?.duration}
      />
    );
  }

  return (
    <>
      {repositories.length > 0 && (
        <RepositoryDetails repository={repositories[0]}>
          <Suspense fallback={<Loading />}>
            <MarkdownContainer pathname={location.pathname} />
          </Suspense>
        </RepositoryDetails>
      )}
    </>
  );
};

RepositoryDisplay.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  repositories: PropTypes.arrayOf(RepositoryProps),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    error: PropTypes.string,
    message: PropTypes.string,
    duration: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
};

RepositoryDisplay.defaultProps = {
  error: null,
  repositories: [],
};

const mapStateToProps = (state, { location }) => {
  const { pager, api } = state;
  return {
    repositories: getRepoById(location.repoId, pager.current, state),
    loading: api.loading ? true : false,
    success: api.success ? true : false,
    duration: api.duration,
    error: api.error ? api : null,
  };
};

export default connect(mapStateToProps)(RepositoryDisplay);
