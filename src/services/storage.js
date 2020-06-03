const getToken = () => {
  return localStorage.getItem('github_token');
};

const storeToken = (token) => {
  localStorage.setItem('github_token', token);
};

const removeToken = () => {
  localStorage.removeItem('github_token');
};

export const LocalStorageService = {
  getToken,
  storeToken,
  removeToken,
};
