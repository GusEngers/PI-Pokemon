const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 86400 });

module.exports = cache;
