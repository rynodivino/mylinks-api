'use strict';
module.exports = (client, id, cb) => {
    if (client && id && cb) {
        return client.get(id, cb);
    }
};
