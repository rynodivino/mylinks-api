const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const log = require('winston');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use('/', routes);
app.listen(3000, function () {
    log.info('Example app listening on port 3000!');
});
