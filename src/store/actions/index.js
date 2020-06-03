import parse from 'parse-link-header';
import { GithubService } from 'src/services/github';
import {
  STORE_REPOS,
  UPDATE_QUERY,
  UPDATE_PAGER,
  API_STATE,
} from '../actions/contants';

const loading = () => ({
  type: API_STATE,
  payload: {
    loading: true,
  },
});

const success = ({ duration }) => ({
  type: API_STATE,
  payload: {
    success: true,
    duration,
  },
});

const error = ({ error, message, duration }) => ({
  type: API_STATE,
  payload: {
    error,
    message,
    duration,
  },
});

const search = (query, token) => {
  const updateQuery = (query) => ({
    type: UPDATE_QUERY,
    payload: query,
  });
  const storeRepos = (items) => ({
    type: STORE_REPOS,
    payload: {
      items: items,
      page: 1,
    },
  });
  const updatePager = (pages) => ({
    type: UPDATE_PAGER,
    payload: pages,
  });

  return (dispatch) => {
    dispatch(updateQuery(query));
    dispatch(loading());
    return GithubService.searchRepos(1, query, token)
      .then((response) => {
        if (response.status === 'ok') {
          dispatch(storeRepos(response.results.items));
          const pages = parse(response.link);
          const pager = {
            current: 1,
            last: pages ? parseInt(pages.last?.page) : 1,
          };
          dispatch(updatePager(pager));
          dispatch(success({ duration: response.duration }));
        } else {
          dispatch(
            error({
              error: response.status,
              message: response.message,
              duration: response.duration,
            }),
          );
        }
      })
      .catch((response) => {
        dispatch(
          error({
            error: response,
            message: response.message,
            duration: 0,
          }),
        );
        return {
          error: response,
          message: response.message,
          duration: 0,
        };
      });
  };
};

const fetchPage = (page, pager, query, token) => {
  const updatePager = (pages) => ({
    type: UPDATE_PAGER,
    payload: pages,
  });

  const storeRepos = (items) => ({
    type: STORE_REPOS,
    payload: {
      items: items,
      page: page,
    },
  });

  return (dispatch) => {
    dispatch(loading());
    return GithubService.searchRepos(page, query, token)
      .then((response) => {
        if (response.status === 'ok') {
          dispatch(storeRepos(response.results.items));
          dispatch(
            updatePager({
              ...pager,
              current: page,
            }),
          );
          dispatch(success({ duration: response.duration }));
        } else {
          dispatch(
            error({
              error: response.status,
              message: response.message,
              duration: response.duration,
            }),
          );
        }
      })
      .catch((response) => {
        dispatch(
          error({
            error: response,
            message: response.message,
            duration: 0,
          }),
        );
        return {
          error: response,
          message: response.message,
          duration: 0,
        };
      });
  };
};

const changePage = (page, pager) => {
  const updatePager = (pages) => ({
    type: UPDATE_PAGER,
    payload: pages,
  });

  return (dispatch) => {
    dispatch(
      updatePager({
        ...pager,
        current: page,
      }),
    );
  };
};

const fetchRepo = (pathname, token) => {
  const storeRepos = (items) => ({
    type: STORE_REPOS,
    payload: {
      items: [items],
      page: 1,
    },
  });

  const updatePager = () => ({
    type: UPDATE_PAGER,
    payload: { current: 1 },
  });

  return (dispatch) => {
    dispatch(loading());
    return GithubService.getRepo(pathname, token)
      .then((response) => {
        if (response.status === 'ok') {
          dispatch(storeRepos(response.results));
          dispatch(updatePager());
          dispatch(success({ duration: response.duration }));
        } else {
          dispatch(
            error({
              error: response.status,
              message: response.message,
              duration: response.duration,
            }),
          );
        }
      })
      .catch((response) => {
        dispatch(
          error({
            error: response,
            message: response.message,
            duration: 0,
          }),
        );
        return {
          error: response,
          message: response.message,
          duration: 0,
        };
      });
  };
};

export { search, fetchPage, changePage, fetchRepo };
