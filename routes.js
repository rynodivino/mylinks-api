const redirect = require('./routes/redirect');
const redis = require('redis');
const redisClient = redis.createClient();
const routes = require('express').Router();
const api = require('./api/rest');

// Look up link if possible.
routes.param('id', (req, res, next, id) => {
    req.link = null;
    if (id) {
        redisClient.get(id, (err, data) => {
            if (data) {
                req.link = JSON.parse(data);
            }
            next();
        }); 
    }
});

// Redirect route (move to web app).
routes.get('/redirects/:id', redirect);

// Simple api for crud operations.

routes.get('/owners/:owner', (req, res) => {
    if (req.owner) {
        res.status(200).json({
            data: req.owner,
            msg: 'Success'
        });
    } else {
        res.status(401).json({
            msg:  'Owner does not exist.'
        });
    }
    return res.end();
});

// Simple api for crud operations.
//
// Look up link if possible.
routes.param('owner', (req, res, next, owner) => {
    req.owner = null;
    if (owner) {
        redisClient.hgetall(owner, function (err, data) {
            if (data) {
                req.owner = data;
            }
            next();
        }); 
    }
});

// CRUD (-R)
routes.post('/owners/:owner/links/:id', api.post);
routes.put('/owners/:owner/links/:id', api.put);
routes.delete('/owners/:owner/links/:id', api.del);
routes.get('*', (req, res) => {
    res.status(404).json({
        message: 'Page does not exist.'
    });
    return res.end();
});

module.exports = routes;
