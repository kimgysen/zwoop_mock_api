
const fs = require('fs');
const axios = require('axios');
const config = require('config');
const { downloadImage }  = require('../utils/download');

const getPhotosUri = config.get('google.api.placePhotoUri');
const photosUri = config.get('google.api.placePhotos');
const apiKey = config.get('google.apiKey');


exports.getGooglePlaceImageUri = async(placeId) => {
    const uri = parseUri(getPhotosUri, apiKey, { placeId });
    console.log('uri', uri);
    return axios
        .get(uri)
};

exports.getGooglePlaceImage = async (placeId, photoId) => {
    const uri = parseUri(photosUri, apiKey, { photoId });
    const fileName = placeId + '.png';
    const savePath = __dirname + '/../public/img/google' + '/' + fileName;

    if(!fs.existsSync(savePath)) {
        await downloadImage(uri, savePath);
    }
    return 'localhost:8050/public/img/google/' + fileName;
};

function parseUri(uri, apiKey, ids) {
    const placeId = ids.placeId;
    const photoId = ids.photoId;

    let tempUri = uri.replace('{apiKey}', apiKey);
    if (photoId) tempUri = tempUri.replace('{photoId}', photoId);
    if (placeId) tempUri = tempUri.replace('{placeId}', placeId);

    return tempUri;
}
