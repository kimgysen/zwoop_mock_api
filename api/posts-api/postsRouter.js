
const config = require('config');
const Router = require('restify-router').Router;
const HttpStatus = require('http-status-codes');
const { generateSamplePosts } = require('./service');


const router = new Router();

const API_VERSION = config.get('api.version');


const getPostsByPlaceId = (req, res, next) => {
  const placeId = req.params.placeId;

  const posts = generateSamplePosts(placeId, 1, 10);

  res.send(HttpStatus.OK, posts);
};

router.get({ path: '/places/:placeId/posts', version: API_VERSION }, getPostsByPlaceId);

module.exports = router;
