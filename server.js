var port = process.env.PORT || 5000;
var mongoose = require('./config/mongoose'),
    express = require('./config/express');
passport = require('./config/passport');
var db = mongoose();
var app = express();
var passport = passport();

app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;