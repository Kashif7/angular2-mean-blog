var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//Local login authentication procedure
passport.use(new LocalStrategy({
  //querying parameter
  usernameField: 'email'
},
  function (username, password, done) {
    User.findOne({ email: username }, (err, user) => {
      //error handling
      if (err) {
        return done(err);
      }
      // user not found in the databse
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      //incorrect password
      if (!user.checkPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // success
      return done(null, user);
    });
  }
));