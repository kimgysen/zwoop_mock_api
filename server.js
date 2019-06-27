
const config = require('config');
const restify = require('restify');
const Router = require('restify-router').Router;

const API_NAME = config.get('api.name');
const API_IP = config.get('api.host.ip');
const API_PORT = config.get('api.host.port');
const API_PREFIX = config.get('api.prefix');
const API_VERSION = config.get('api.version');
const API_BASE_URI = `${API_IP}:${API_PORT}/${API_PREFIX}/${API_VERSION}`;


// Create server
const server = restify.createServer({
  name: API_NAME,
  versions: [API_VERSION],
  // log,
});

// Setup middleware
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.authorizationParser());

const mainRouter = new Router();


const API_POST_STATS_URI = `/${API_PREFIX}/${API_VERSION}/${ config.get('api.baseUri.postStatsApi') }`;
console.log(API_POST_STATS_URI);
mainRouter.add(API_POST_STATS_URI, require('./post-stats-api/postStatsRouter'));

mainRouter.applyRoutes(server);

server.listen(API_PORT, API_IP, () => {
  console.log('%s listening at %s', server.name, server.url);
});


module.exports = server;
