
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
            watchlistApi: 'watchlist-api',
            placesApi: 'places-api'
        },
    },
    google: {
        api: {
            placePhotoUri: 'https://maps.googleapis.com/maps/api/place/details/json?placeid={placeId}&fields=photos&key={apiKey}',
            placePhotos: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photoId}&sensor=false&key={apiKey}',
        },
        apiKey: 'AIzaSyD5W-5szWtQzEzj0KkZgjTYjSAxE-WHQdg'
    }
};
