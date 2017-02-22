'use strict';

const fetchLink = require('./fetch-link');

const getCallback = (req, res, client) => {
    return (err, data) => {
        if (data) {
            const link = JSON.parse(data);
            if (link.owner === req.body.owner) {
                client.set(link.id, JSON.stringify(req.body));
                res.status(200).json({msg: 'Success'});
            } else {
                res.status(401).json({
                    msg: 'Failed.  Only owner can update this link.'
                });
            }
        } else {
            res.status(401).json({
                msg: 'Failed.  Link does not exist.'
            });
        }
        return res.end();
    };
};

// Add url validation
module.exports = (req, res, client) => {
    if (!req.body.id || !req.body.owner) {
        // reject
    }

    const cb = getCallback(req, res, client);
    fetchLink(client, req.body.id, cb);
};
