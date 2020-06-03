const RepositoryMock = {
  id: 1234,
  name: 'react',
  full_name: 'facebook/react',
  description: 'Library for building UIs',
  stargazers_count: 150000,
  language: 'JavaScript',
  updated_at: '',
  owner: {
    login: 'facebook',
  },
  private: false,
};

const RepositoryArrayMock = [
  {
    id: 1234,
    name: 'react',
    full_name: 'facebook/react',
    description: 'Library for building UIs',
    stargazers_count: 150000,
    language: 'JavaScript',
    updated_at: '',
    owner: {
      login: 'facebook',
    },
    private: false,
  },
  {
    id: 46456,
    name: 'vue',
    full_name: 'vuejs/vue',
    description: 'Progressive framework',
    stargazers_count: 16000,
    language: 'JavaScript',
    updated_at: '',
    owner: {
      login: 'vuejs',
    },
    private: false,
  },
];

const MockedGithubSearchResponse = {
  total_count: 2,
  incomplete_results: false,
  items: [
    {
      id: 11730342,
      name: 'vue',
      full_name: 'vuejs/vue',
      private: false,
      owner: {
        login: 'vuejs',
        id: 6128107,
        avatar_url:
          'https://avatars1.githubusercontent.com/u/6128107?v=4',
      },
      html_url: 'https://github.com/vuejs/vue',
      description:
        '🖖 Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.',
      updated_at: '2020-06-02T08:29:16Z',

      stargazers_count: 165128,
      watchers_count: 165128,
      language: 'JavaScript',
      forks_count: 25032,
      open_issues_count: 509,
      forks: 25032,
    },
    {
      id: 77189043,
      name: 'vue2-elm',
      full_name: 'bailicangdu/vue2-elm',
      private: false,
      owner: {
        login: 'bailicangdu',
        id: 20297227,
        avatar_url:
          'https://avatars2.githubusercontent.com/u/20297227?v=4',
      },
      html_url: 'https://github.com/bailicangdu/vue2-elm',
      description:
        '基于 vue2 + vuex 构建一个具有 45 个页面的大型单页面应用',
      updated_at: '2020-06-02T08:13:35Z',
      size: 29812,
      stargazers_count: 33331,
      watchers_count: 33331,
      language: 'Vue',
      forks_count: 11052,
      open_issues_count: 72,
    },
  ],
};

export {
  RepositoryMock,
  RepositoryArrayMock,
  MockedGithubSearchResponse,
};
