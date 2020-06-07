import { LocalStorageService } from './storage';

const BASE_URL = 'https://api.github.com';
const CORS_PREFIX = 'https://cors-anywhere.herokuapp.com/';

const formatQuery = (query) => {
  return query.replace(' ', '+');
};

const buildPathname = (page, query) => {
  return `/search/repositories?q=${formatQuery(
    query,
  )}&order=desc&page=${page}&per_page=9`;
};

const getFetchDurationTimestamp = (url) => {
  const resources = performance.getEntriesByType('resource');
  const timing = resources.filter((item) => item.name === url);
  return timing[timing.length - 1].duration / 1000;
};

const fetchData = async (
  pathname,
  token,
  query = '',
  signal = null,
) => {
  const url = `${BASE_URL}${pathname}${query}`;

  let options = { signal };
  if (token) {
    options = {
      signal,
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
  }

  const response = await fetch(url, options);
  const { headers, status } = await response;
  const results = await response.json();
  const duration = getFetchDurationTimestamp(url);
  if (status === 200) {
    return {
      status: 'ok',
      duration,
      link: headers.get('link'),
      results: results,
    };
  }
  if (status === 401) {
    LocalStorageService.removeToken();
    return {
      status: 'unauthorized',
      duration,
      message: results.message,
    };
  } else {
    return {
      status: 'network-error',
      duration,
      message: results.message,
    };
  }
};

const searchRepos = async (page, query, token, signal = null) => {
  const pathname = buildPathname(page, query);
  return fetchData(pathname, token, '', signal);
};

const getRepo = async (pathname, token) => {
  return fetchData(pathname, token);
};

const getReadmeData = async (pathname, token) => {
  const markdownResponse = await fetchData(
    pathname,
    token,
    '/readme',
  );

  if (markdownResponse.status === 'ok') {
    let options = {};
    if (token !== null) {
      options = {
        method: 'GET',
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
    }
    const markdownFileResponse = await fetch(
      CORS_PREFIX + markdownResponse.results.download_url,
      options,
    );
    const markdownFile = await markdownFileResponse.text();
    return {
      status: 'ok',
      file: markdownFile,
      readmeURL: markdownResponse.results.html_url,
    };
  } else {
    return markdownResponse;
  }
};

export const GithubService = {
  searchRepos,
  getRepo,
  getReadmeData,
};
