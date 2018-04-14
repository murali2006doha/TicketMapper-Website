//Default function handlers
var path = require('path');
exports.index = function (req, res, next) {
  res.sendFile("index.html");
};

exports.error = function (req, res, next) {
  res.status(404).send("Sorry, we didn't find what you were looking for");
};