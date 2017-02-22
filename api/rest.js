const del = require('./delete');
const post = require('./post');
const put = require('./put');
const redis = require('redis');
const redisClient = redis.createClient();

module.exports = {
    del: (req, res) => {
        return del(req, res, redisClient);
    },
    post: (req, res) => {
        return post(req, res, redisClient);
    },
    put: (req, res) => {
        return put(req, res, redisClient);
    }
};
