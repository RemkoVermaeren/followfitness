(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongoose = require('mongoose');
  var Exercise = mongoose.model('Exercise');
  var Machine = mongoose.model('Machine');
  var Training = mongoose.model('Training');
  var User = mongoose.model('User');
  var passport = require('passport');
  var jwt = require('express-jwt');
  var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', {
      title: 'Express'
    });
  });

  router.post('/register', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        message: 'Please fill out all fields'
      });
    }
    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.save(function(err) {
      if (err) {
        if(err.name === 'MongoError' && err.code === 11000){
          //Duplicate username
          return res.status(500).send({success: false, message: 'User already exists'});
        }
        return res.status(500).send(err);
      }
      return res.json({
        token: user.generateJWT()
      });
    });
  });

  router.post('/login', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        message: 'Please fill out all fields'
      });
    }
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (user) {
        return res.json({
          token: user.generateJWT()
        });
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  });

  module.exports = router;
})();
