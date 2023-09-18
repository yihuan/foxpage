const mongoConfig = process.env.MONGO_CONFIG;

export default {
  host: '',
  port: 50000,
  jwtKey: 'test',
  ignoreTokenPath: [
    '/swagger/swagger.json',
    '/swagger/swagger',
    '/users/login',
    '/users/register',
    '/healthcheck',
    '/applications/list',
    '/components/live-versions',
    '/components/version-infos',
    '/pages/lives',
    '/templates/lives',
    '/blocks/lives',
    '/content/tag-versions',
    '/content/tag-contents',
    '/contents',
    '/contents/changes',
    '/functions/lives',
    '/conditions/lives',
    '/variables/lives',
    '/mocks/lives',
    '/pages/live-infos',
    '/blocks/live-infos',
    '/pages/draft-infos',
    '/blocks/draft-infos',
    '/files',
  ],
  mongodb: mongoConfig || '',
  locale: 'en',
  plugins: ['@foxpage/foxpage-plugin-unpkg'],
  metric: {
    name: '',
    debug: false,
  },
  allLocales: ['en-US', 'zh-HK', 'en-HK', 'ko-KR', 'ja-JP'], // Supported locales
  saveRequestLog: false,
};
