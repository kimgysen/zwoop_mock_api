
const fs = require('fs');
const config = require('config');
const Router = require('restify-router').Router;
const HttpStatus = require('http-status-codes');
const random = require('../../utils/random');
const googlePlaces = require('../../samples/googlePlaces');
const { getGooglePlaceImageUri, getGooglePlaceImage } = require('../../services/googleClient');


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
  googlePlace.imgUri = 'http://localhost:8050/public/img/google/' + placeId + '.png';

  res.send(HttpStatus.OK, googlePlace);

};

const getPhotoByPlaceId = async (req, res, next) => {

  const placeId = req.params.placeId;

  const fileName = placeId + '.png';
  const savePath = __dirname + '/../../public/img/google' + '/' + fileName;

  if(!fs.existsSync(savePath)) {
      const imageUriRes = await getGooglePlaceImageUri(placeId);
      const photoReference = imageUriRes.data.result.photos[0].photo_reference;
      await getGooglePlaceImage(placeId, photoReference);
  }

  const imgUri = 'http://localhost:8050/public/img/google/' + fileName;
  res.send(HttpStatus.OK, imgUri);

};

router.get({ path: '/places/:placeId', version: API_VERSION }, getPlaceById);
router.get({ path: '/places/:placeId/photo', version: API_VERSION} , getPhotoByPlaceId);

module.exports = router;
