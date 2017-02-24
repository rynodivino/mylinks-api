const log = require('winston');
const server = require('./server');

server.listen(3000, function () {
    log.info('Example app listening on port 3000!');
});
