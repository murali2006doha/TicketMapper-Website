//Routes to handle CRUD operations on users
var users = require('../controller/user_controller');

/*
Routes URLs to specific REST methods based on method that is called in reducer files.
*/

module.exports = function (app) {
  app.route('/users').post(users.create)
    .get(users.list);
  app.route('/users/:id').get(users.read)
    .put(users.update)
    .delete(users.delete);
  app.param('id', users.find);

  //Creates user and inserts into database
  app.route('/signup').post(users.signup);
  app.route('/login').post(users.signin);

  //Signs out user out and redirects to homepage
  app.route('/signout').get(users.signout);
  app.route('/session').get(users.sessionCheck);
};