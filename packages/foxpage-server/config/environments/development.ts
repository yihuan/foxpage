const mongoConfig = process.env.MONGO_CONFIG;

export default {
  host: '',
  port: 50001,
  jwtKey: 'mock', // Generate jwt key text
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
    '/content/tag-versions',
    '/content/tag-contents',
    '/contents',
    '/contents/changes',
    '/functions/lives',
    '/conditions/lives',
    '/variables/lives',
    '/mocks/lives',
    '/pages/live-infos',
    '/pages/draft-infos',
    '/files',
  ], // Skip to verify the interface of the token
  mongodb: mongoConfig || '', // Database connection string
  locale: 'en', // Current language
  plugins: ['@foxpage/foxpage-plugin-unpkg'],
  metric: {
    name: '',
    debug: true,
  },
  allLocales: [
    'en-US',
    'zh-HK',
    'en-HK',
    'ko-KR',
    'ja-JP',
    'en-IN',
    'en-CA',
    'es-US',
    'no-NO',
    'da-DK',
    'pt-PT',
    'es-MX',
    'uk-UA',
    'fi-FI',
    'kk-KZ',
    'sv-SE',
    'en-BE',
    'fr-CH',
    'en-CH',
    'fr-BE',
    'nl-BE',
    'de-CH',
    'de-AT',
    'en-IE',
    'ar-SA',
    'ar-AE',
    'ar-XX',
    'en-XX',
    'en-NZ',
    'en-IL',
    'en-SA',
    'en-AE',
    'nl-NL',
    'el-GR',
    'pt-BR',
    'tr-TR',
    'pl-PL',
    'en-TH',
    'en-ID',
    'en-MY',
    'en-KR',
    'en-JP',
    'zh-SG',
    'en-GB',
    'it-IT',
    'zh-TW',
    'tl-PH',
    'vi-VN',
    'en-AU',
    'th-TH',
    'id-ID',
    'ms-MY',
    'en-SG',
    'zh-CN',
    'ru-RU',
    'es-ES',
    'de-DE',
    'fr-FR',
    'ko-KR',
    'ja-JP',
  ], // Supported locales
};
