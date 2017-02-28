'use strict';

const fetchLink = require('./fetch-link');

const getCallback = (req, res, client) => {
    return (err, data) => {
        if (data) {
            const link = JSON.parse(data);
            if (link.owner === req.params.owner) {
                // need to async or promis these nested callbacks.
                client.del(link.id, (err, reply) => {
                    if (reply !== undefined) {
                        client.hdel(req.params.owner, req.params.id, (err, reply) => {
                            if (reply !== undefined) {
                                res.status(200).json({message: 'Success'});
                            }
                        });
                    }
                });
                // delete owner hash as well.
            } else {
                res.status(401).json({
                    message: 'Failed.  Only owner can delete this link.'
                });
            }
        } else {
            res.status(401).json({
                message: 'Failed.  Link does not exist.'
            });
        }
    };
};

module.exports = {
    del: (req, res, redisClient) => {
        if (!req.params.id || !req.params.owner) {
            res.status(400).json({
                message: 'Missing required parameters.'
            });
        } else {
            const cb = getCallback(req, res, redisClient);
            fetchLink(redisClient, req.params.id, cb);
        }
    },
    getCallback
};
