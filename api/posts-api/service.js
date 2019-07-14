
const { generateRandomIdBetween, shuffle } = require('../../utils/random');
const userSamples = require('../../samples/users');
const googlePlaces = require('../../samples/googlePlaces');


exports.generateSamplePosts = (googlePlaceId, offset, limit ) => {

    let posts = [];
    // Image indices, random shuffled
    const shuffled = shuffle([...Array(10).keys()]);

    for (let i = offset; i < limit; i++) {

        let postId = 'post-' + i;
        let randomUser = generateRandomIdBetween(1, 10);
        let nrComments = generateRandomIdBetween(1, 20);
        let nrLikes = generateRandomIdBetween(1, 5000);

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
            postImg: 'http://localhost:8050/public/img/img_' + shuffled[i] + '.png',
            timestamp: new Date().getTime(),
            nrComments,
            nrLikes
        };
        posts.push(post);
    }

    return posts;

};
