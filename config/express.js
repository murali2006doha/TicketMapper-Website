//The configuration file for express
//Modules
var express = require('express'),
    path = require('path'),
    cookieSession = require('cookie-session'),
    keys = require('./keys'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session');

//export our own wrapped version of express
module.exports = function() {
  var app = express(); //default express

  app.use(express.static(path.join(__dirname, '../client/build')));

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json({ type: 'application/json' }));

  app.use(
    cookieSession({
      maxAge: 30*24*60*60*1000, //30 days
      keys: [keys.cookieKey]
    })
  )

  app.use(session({secret: 'dansnothot', saveUninitialized: false, resave: true, cookie: { maxAge: null }}))

  app.use(passport.initialize())
  app.use(passport.session())

  require('../routes/user_route')(app);
  require('../routes/attractions_route')(app);
  require('../routes/default_route')(app);


  return app;


};
