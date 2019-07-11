
/**
 * Configuration file for develop
 */
module.exports = {
  env: 'develop',
  api: {
    name: 'Zwoop',
    host: {
      ip: '127.0.0.1',
      port: '8050',
    },
    version: '1.0.0',
    prefix: 'api',
    baseUri: {
      postsApi: 'posts-api',
      postStatsApi: 'post-stats-api',
      watchlistApi: 'watchlist-api'
    },
  },
};
