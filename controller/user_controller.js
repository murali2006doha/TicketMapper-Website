//Controller handling all CRUD operations on users
var User = require('mongoose').model('User');
var passport = require('passport');

//Creates new user
exports.create = function (req, res, next) {
  //Creates a new User from the req.body
  var user = new User(req.body); 
  //Stores this new item in the database
  user.save(function (err) { 
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};

//Lists all users in JSON format
exports.list = function (req, res, next) {
  //Looks for all items satisfying the given conditions in the database
  User.find({}, function (err, users) { 
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });
};

//Finds a particular user using their unique id
exports.find = function (req, res, next, id) {
  //Looks for first item satisfying the given conditions in the database
  User.findOne({ _id: id }, function (err, user) { 
    if (err) {
      return next(err);
    } else {
      //Sets req.user to the found user
      req.user = user; 
      next();
    }
  });
};

//Reads a found user in JSON format
exports.read = function (req, res, next) {
  res.json(req.user);
};

//Updates a found user with new fields
exports.update = function (req, res, next) {
  User.findByIdAndUpdate(req.user.id, req.body, function (err, user) { //Finds an item in the database according to a given id, takes in a replacement JSON body, and performs the update
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};

//Deletes the user that was found
exports.delete = function (req, res, next) {
  //Removes an item in the database
  req.user.remove(function (err) { 
    if (err) {
      return next(err);
    } else {
      res.send("Account Deleted");
    }
  });
};

exports.signup = function (req, res, next) {
  console.log(req.user)
  var user = new User(req.body);
  user.save(function (err) {
    if (err) {
      return res.send(500, err);
    } else {
      return res.send("Account Successfully Created")
    }
  })
};

exports.signin = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      console.log(err);
      return res.send(500, info);
    }
    if (!user) {
      return res.send(500, info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      userData = req.user._doc 
      delete userData.password
      delete userData.salt
      return res.send({...userData});
    });
  })(req, res, next);
};

exports.signout = function (req, res) {
  //Clears req.user and redirects
  req.logOut();
  res.redirect('/');
};

exports.sessionCheck = function (req, res) {
  if (!req.user) {
    return res.send(401);
  }
  userData = {...req.user._doc}
  delete userData.password
  delete userData.salt
  return res.send(200, userData)
}