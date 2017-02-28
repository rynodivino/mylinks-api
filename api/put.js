'use strict';

const fetchLink = require('./fetch-link');

const getCallback = (req, res, client) => {
    return (err, data) => {
        if (data) {
            const link = JSON.parse(data);
            if (link.owner === req.body.owner) {
                client.set(link.id, JSON.stringify(req.body));
                res.status(200).json({message: 'Success'});
            } else {
                res.status(401).json({
                    message: 'Failed.  Only owner can update this link.'
                });
            }
        } else {
            res.status(401).json({
                message: 'Failed.  Link does not exist.'
            });
        }
        return res.end();
    };
};

// Add url validation
module.exports = {
    put: (req, res, client) => {
        if (!req.params.id || !req.params.owner) {
            return res.status(401).send('Missing required parameters.');
        }

        const cb = getCallback(req, res, client);
        return fetchLink(client, req.body.id, cb);
    },
    getCallback
};
