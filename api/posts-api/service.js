
const random = require('../../utils/random');
const userSamples = require('../../samples/users');
const googlePlaces = require('../../samples/googlePlaces');


exports.generateSamplePosts = (googlePlaceId, offset, limit ) => {

    let posts = [];

    for (let i = offset; i < limit; i++) {

        let postId = random.generateRandomIdBetween(1, 100);
        let randomUser = random.generateRandomIdBetween(1, 10);
        let randomImg = random.generateRandomIdBetween(1, 3);
        let nrComments = random.generateRandomIdBetween(1, 20);
        let nrLikes = random.generateRandomIdBetween(1, 5000);

        let user = userSamples[randomUser];
        let postText = 'post text ' + i;

        let googlePlace;

        for (let key in googlePlaces) {
            const gpValues = googlePlaces[key];
            for (let gpKey in gpValues) {
                if (gpKey === 'googlePlaceId' && gpValues[gpKey] === googlePlaceId) {
                    googlePlace = googlePlaces[key];
                }
            }
        }

        let post = {
            postId,
            googlePlaceId,
            googlePlaceName: googlePlace.googlePlaceName,
            lat: googlePlace.lat,
            lng: googlePlace.lng,
            authorId: user.userId,
            authorFirstName: user.firstName,
            authorLastName: user.lastName,
            postText,
            timestamp: new Date().getTime(),
            nrComments,
            nrLikes
        };
        console.log(post);
        posts.push(post);
    }

    return posts;

};
