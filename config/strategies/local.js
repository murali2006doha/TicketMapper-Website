var passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User')

module.exports = function() {
  passport.use(new localStrategy({usernameField: 'email'}, function(email, password, done) {
    User.findOne({
      email: email
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'No user exists'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid password'
        });
      }
      return done(null, user);
    });
  }));
};
