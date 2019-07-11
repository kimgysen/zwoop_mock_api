
const config = require('config');
const Router = require('restify-router').Router;
const HttpStatus = require('http-status-codes');
const watchlist = require('./samples/watchlist');
const { paginate } = require('../common/utils/pagination');


const router = new Router();

const API_VERSION = config.get('api.version');


const getWatchlist = (req, res, next) => {
  const { userId } = req.query;
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;

  const watchlistItems = paginate(watchlist, offset, limit);

  res.send(HttpStatus.OK, watchlistItems);
};

router.get({ path: '/watchlist', version: API_VERSION }, getWatchlist);

module.exports = router;
