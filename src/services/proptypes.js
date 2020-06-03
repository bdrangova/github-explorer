import PropTypes from 'prop-types';

export const RepositoryProps = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  full_name: PropTypes.string,
  description: PropTypes.string,
  stargazers_count: PropTypes.number,
  watchers_count: PropTypes.number,
  forks: PropTypes.number,
  language: PropTypes.string,
  update_at: PropTypes.string,
  private: PropTypes.bool,
  owner: PropTypes.shape({
    login: PropTypes.string,
  }),
});

export const PagerProps = PropTypes.shape({
  current: PropTypes.number,
  last: PropTypes.number,
});

export const RouteProps = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  repoId: PropTypes.number,
});
