//Routes to navigate through default pages
var def = require('../controller/default_controller');

module.exports = function (app) {
  app.route('/').get(def.index);
  app.route('*').get(def.error);
};