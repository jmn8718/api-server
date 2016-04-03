var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var User = require('../../models/user');
var validator = require('validator');

// router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req, res, next) {
//   User.find({},function(err, users){
//     if (err) throw err;
//     res.json(users);
//   })
// });

router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username , email:req.body.email}),
      req.body.password, function(err, user) {
        if (err)
          return res.status(500).json({err: err});

        if(req.body.firstname)
          user.firstname = req.body.firstname;

        if(req.body.lastname)
          user.lastname = req.body.lastname;

        user.save(function(err,user) {
          if (err)
            return res.status(500).json({err: err});

          passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
          });
        });
      });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
      status: 'Logout successful!',
      success: true,
  });
});

module.exports = router;