
const config = require('config');
const Router = require('restify-router').Router;
const HttpStatus = require('http-status-codes');
const random = require('../../utils/random');
const googlePlaces = require('../../samples/googlePlaces');


const router = new Router();

const API_VERSION = config.get('api.version');


const getPlaceById = (req, res, next) => {
  const placeId = req.params.placeId;

  let googlePlace;

  for (let key in googlePlaces) {
    const gpValues = googlePlaces[key];
    for (let gpKey in gpValues) {
      if (gpKey === 'googlePlaceId' && gpValues[gpKey] === placeId) {
        googlePlace = googlePlaces[key];
      }
    }
  }
  googlePlace.nrWatchers = random.generateRandomIdBetween(1, 5324);

  res.send(HttpStatus.OK, googlePlace);

};

router.get({ path: '/places/:placeId', version: API_VERSION }, getPlaceById);

module.exports = router;
