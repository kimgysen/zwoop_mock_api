
const config = require('config');
const Router = require('restify-router').Router;
const HttpStatus = require('http-status-codes');
const postStats = require('./samples/poststats');
const { paginate } = require('../../common/utils/pagination');


const router = new Router();

const API_VERSION = config.get('api.version');


const getTrending = (req, res, next) => {
  const { near_lat, near_lng, since } = req.query;
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;

  const trendingItems = paginate(postStats, offset, limit);

  res.send(HttpStatus.OK, trendingItems);
};

router.get({ path: '/trending', version: API_VERSION }, getTrending);

module.exports = router;
