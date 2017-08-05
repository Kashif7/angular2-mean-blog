var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  var user = new User();

  user.fullname = req.body.fullname;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {

  passport.authenticate('local', function(err, user, info){
    var token;

    //s If Passport throws/catches an error
    if (err) {
      res.status(404).send(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.send({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).send(info);
    }
  })(req, res);

};