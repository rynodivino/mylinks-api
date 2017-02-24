const mockery = require('mockery');
const redisMock = require('../../mocks/redisClient');
const tap = require('tap');
const test = tap.test;

/**
 *
'use strict';

module.exports = (req, res, redisClient) => {
    if (!req.body.id || !req.body.owner) {
        res.status(400).json({
            message: 'Missing required parameters.'
        });
    }
    redisClient.get(req.body.id, (err, data) => {
        if (data) {
            const link = JSON.parse(data);
            if (link.owner === req.body.owner) {
                // need to async or promis these nested callbacks.
                redisClient.del(link.id, (err, reply) => {
                    if (reply !== undefined) {
                        redisClient.hdel(req.body.owner, req.body.id, (err, reply) => {
                            if (reply !== undefined) {
                                res.status(200).json({msg: 'Success'});
                            }
                        });
                    }
                });
                // delete owner hash as well.
            } else {
                res.status(401).json({
                    msg: 'Failed.  Only owner can delete this link.'
                });
            }
        } else {
            res.status(401).json({
                msg: 'Failed.  Link does not exist.'
            });
        }
    }); 
};
*/

test('Ryan is a sucker', (t) => {
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    });
    mockery.registerMock('redis', redisMock);
    let rest = require('../../../api/rest');

    t.plan(3);
    t.ok(rest.del);
    t.ok(rest.post);
    t.ok(rest.put);
});
