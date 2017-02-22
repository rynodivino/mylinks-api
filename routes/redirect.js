'use strict';

// Redirect route (main use case).
module.exports = (req, res) => {
    if (req.link && req.link.url) {
        res.redirect(req.link.url);
    } else {
        res.send('Sorry, couldn\'t find that oa link');
    }
    return res.end();
};
