'use strict';
// client
//
// Add url validation
module.exports = (req, res, redisClient) => {
    if (req.body.id && req.body.owner !== req.body.id) {
        redisClient.setnx(req.body.id, JSON.stringify(req.body), (err, reply) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal server error.'
                });
            }

            if(reply) {
                redisClient.hset([req.body.owner, req.body.id, req.body.url], function (err, reply){
                    if (reply !== undefined) {
                        res.status(200).json({
                            msg: 'Success'
                        });
                    }
                });
            } else {
                res.status(409).json({
                    msg: 'Failed.  Link already exists.'
                });
            }
        });
        // also add redisClient.hash append idddk
    } else {
        res.status(400).json({
            message: 'Missing required parameters.'
        });
    }
};
