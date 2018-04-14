var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

/*
MongoDB schema for user data. 
Contains user login information and list of following attractions. 
*/

var UserSchema = new Schema({
      name: String,
      email: String,
      password: String,
      dob: Date,
      following: [{
            performerID: String,
            performer: String,
            upcomingEvents: 0
      }],
      salt: String
});

UserSchema.pre('save', function (next) {
      if (this.password) {
            this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
            this.password = this.hashPassword(this.password);
      }
      next();
});

UserSchema.methods.hashPassword = function (password) {
      return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

UserSchema.methods.authenticate = function (password) {
      return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);