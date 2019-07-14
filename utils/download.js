
const axios = require('axios');
const fs = require('fs');


exports.downloadImage = (uri, savePath) => {
    return axios(
        uri,
        { method: 'GET', responseType: 'stream'})
        .then(
            response =>
                new Promise((resolve, reject) => {
                    response.data
                        .pipe(fs.createWriteStream(savePath))
                        .on('finish', () => resolve(savePath))
                        .on('error', e => reject(e));
                }),
    );

};
