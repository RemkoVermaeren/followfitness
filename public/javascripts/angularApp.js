(function() {

    'use strict';

    angular.module('followFitnessApp').config(followFitnessState);

    followFitnessState.$inject = ['$stateProvider', '$urlRouterProvider'];

    function followFitnessState($stateProvider, $urlRouterProvider) {

            $stateProvider.state('trainings', {
                url: '/trainings',
                templateUrl: '/trainings.html',
                controller : 'TrainingController',
                controllerAs : 'ctrl',
                onEnter: ['$state', 'authService', function($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go('register');
                    }
                }],
                resolve: {
                trainings: ['trainingService', function(trainingService) {
                         return trainingService.getAll();
                }]
                }
            }).state('newtraining', {
                url: '/newtraining',
                templateUrl: '/newtraining.html',
                controller: 'TrainingController',
                controllerAs : 'ctrl'
                }
            ).state('edittraining', {
                    url: '/{id}/edittraining',
                    templateUrl: '/edittraining.html',
                    controller: 'TrainingController',
                    controllerAs : 'ctrl'
                }
            ).state('newexercise', {
                url: '/{id}/newexercise',
                templateUrl: '/newexercise.html',
                controller: 'ExerciseController',
                controllerAs: 'ctrl'
                ,
                resolve: {
                    exercises: ['$stateParams', 'exerciseService', function ($stateParams, exerciseService) {
                        return exerciseService.setTrainingId($stateParams.id);
                    }]
                }}
            ).state('editexercise', {
                url: '/{id}/newexercise',
                templateUrl: '/newexercise.html',
                controller: 'ExerciseController',
                controllerAs: 'ctrl'
                ,
                resolve: {
                    exercises: ['$stateParams', 'exerciseService', function ($stateParams, exerciseService) {
                        return exerciseService.setTrainingId($stateParams.id);
                    }]
                }}
            ).state('exercises', {
                url: '/{id}/exercises',
                templateUrl: '/exercises.html',
                controller: 'ExerciseController',
                controllerAs: 'ctrl',
                resolve: {
                    exercises: ['$stateParams', 'exerciseService', function ($stateParams, exerciseService) {
                        return exerciseService.setTrainingId($stateParams.id);
                    }]
                }}
            ).state('login', {
            url: '/login',
            templateUrl: '/login.html',
            controller: 'AuthController',
            controllerAs: 'ctrl'


        }).state('register', {
            url: '/register',
            templateUrl: '/register.html',
            controller: 'AuthController',
            controllerAs: 'ctrl'

        });
        $urlRouterProvider.otherwise('register');
    }

})();
