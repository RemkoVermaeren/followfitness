(function () {

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
    router.get('/', function (req, res, next) {
        res.render('index', {
            title: 'Express'
        });
    });


    router.post('/register', function (req, res, next) {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({message: 'Please fill out all fields'});
        }
        var user = new User();

        user.username = req.body.username;
        user.setPassword(req.body.password);
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.json({token: user.generateJWT()})
        });
    });

    router.post('/login', function (req, res, next) {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({message: 'Please fill out all fields'});
        }
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (user) {
                return res.json({token: user.generateJWT()});
            } else {
                return res.status(401).json(info);
            }
        })(req, res, next);
    });

    //TODO: Param for username
    router.param('username', function (req, res, next, id) {
        var query = User.findById(id);

        query.exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('can\'t find user'));
            }

            req.user = user;
            return next();
        });
    });

    //Get a specific user
    router.get('/api/:username', function (req, res) {
        res.json(req.user);
    });

    router.post('/api/:username/trainings', function (req, res, next) {
        var training = new Training(req.body);

        training.user = req.user;
        training.save(function (err, training) {
            if (err) {
                return next(err);
            }
            req.user.trainings.push(training);
            req.user.save(function (err, training) {
                if (err) {
                    return next(err);
                }
                res.json(training);
            });
        });
    });

    router.get('/api/:username/trainings', function (req, res, next) {
        Training.find({
            user: req.user._id
        }).populate('exercises').exec(function (err, trainings) {
            if (err) {
                return next(err);
            }
            res.json(trainings);
        });
    });



    router.param('training', function (req, res, next, id) {
        var query = Training.findById(id);
        query.exec(function (err, training) {
            if (err) {
                return next(err);
            }
            if (!training) {
                return next(new Error('can\'t find training'));
            }
            req.training = training;
            return next();
        });
    });

    router.post('/api/:username/trainings/:training', function (req, res, next) {
        var exercise = new Exercise(req.body);
        exercise.training = req.training;
        exercise.save(function (err, exercise) {
            if (err) {
                return next(err);
            }
            req.training.exercises.push(exercise);
            req.training.save(function (err, exercise) {
                if (err) {
                    return next(err);
                }
                res.json(exercise);
            });
        });
    });
    router.get('/api/:username/trainings/:training', function (req, res, next) {
        res.json(req.training);
    });

    router.get('/api/:username/trainings/:training/exercises', function (req, res, next) {

        Exercise.find({
            training: req.training._id
        }, function (err, exercises) {
            if (err) {
                return next(err);
            }

            res.json(exercises);
        });

    });

    router.put('/api/:username/trainings/:training', function(res,req){
        next();
        Training.findById(req.training._id, function(err, training) {
            if (err) {
                res.send(err);
            }
            training.name = req.body.name;
            training.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json(training);
            });

        });
    });

    module.exports = router;
})();
