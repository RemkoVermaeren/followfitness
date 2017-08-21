(function () {

    'use strict';
    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');
    var Exercise = mongoose.model('Exercise');
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
    //region Register/Login
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
            return res.json({token: user.generateJWT(),id: user._id})
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
                return res.json({token: user.generateJWT(), id: user._id});
            } else {
                return res.status(401).json(info);
            }
        })(req, res, next);
    });
    //endregion
    //region User
    router.param('username',function (req, res, next, id) {
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
    router.get('/api/:username', auth,function (req, res) {
        res.json(req.user);
    });
    //endregion
    //region Training
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
    router.post('/api/:username/trainings', auth ,function (req, res, next) {
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
    router.get('/api/:username/trainings', auth ,function (req, res, next) {
        Training.find({
            user: req.user._id
        }).populate('exercises').exec(function (err, trainings) {
            if (err) {
                return next(err);
            }
            res.json(trainings);
        });
    });
    router.post('/api/:username/trainings/:training', auth ,function (req, res, next) {
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
    router.get('/api/:username/trainings/:training',auth , function (req, res) {
        res.json(req.training);
    });
    router.put('/api/:username/trainings/:training',auth , function (req, res) {
        console.log(req.user);
        var training = req.training;
        training.name = req.body.name;
        training.description = req.body.description;
        training.date = req.body.date;
        training.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json(training);
        });

    });
    router.delete('/api/:username/trainings/:training',auth , function (req, res) {
        var training = req.training;
        training.remove(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Training deleted'
            });
        });
    });
    router.put('/api/:username/trainings/:training/reverseiscompleted', auth ,function (req, res) {
        req.training.reverseIsCompleted(function (err, training) {
            if (err) {
                return next(err);
            }
            res.json(training);
        });
    });
    //endregion
    //region Exercise
    router.param('exercise', function (req, res, next, id) {
        var query = Exercise.findById(id);
        query.exec(function (err, exercise) {
            if (err) {
                return next(err);
            }
            if (!exercise) {
                return next(new Error('can\'t find the exercise'));
            }
            req.exercise = exercise;
            return next();
        });
    });
    router.get('/api/:username/trainings/:training/exercises', auth ,function (req, res, next) {

        Exercise.find({
            training: req.training._id
        }, function (err, exercises) {
            if (err) {
                return next(err);
            }

            res.json(exercises);
        });

    });
    router.get('/api/:username/trainings/:training/exercises/:exercise',auth , function (req, res) {
        res.json(req.exercise);
    });
    router.put('/api/:username/trainings/:training/exercises/:exercise', auth ,function (req, res) {
        var exercise = req.exercise;
        exercise.name = req.body.name;
        exercise.machine = req.body.machine;
        exercise.sets = req.body.sets;
        exercise.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json(exercise);
        });

    });
    router.delete('/api/:username/trainings/:training/exercises/:exercise', auth ,function (req, res) {
        var exercise = req.exercise;
        exercise.remove(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Exercise deleted'
            });
        });
    });
    //endregion
    module.exports = router;
})();
