(function() {

    'use strict';

    angular.module('followFitnessApp').config(followFitnessState)

    followFitnessState.$inject = ['$stateProvider', '$urlRouterProvider']

    function followFitnessState($stateProvider, $urlRouterProvider) {

            $stateProvider.state('trainings', {
                url: '/trainings',
                templateUrl: '/trainings.html',
                controller : 'TrainingController',
                controllerAs : 'ctrl',
                onEnter: ['$state', 'authService', function($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go('login');
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
            ).state('login', {
            url: '/login',
            templateUrl: '/login.html',
            controller: 'AuthController',
            controllerAs: 'ctrl',
                onEnter: ['$state', 'authService', function($state, authService) {
                    if (authService.isLoggedIn()) {
                        $state.go('home');
                    }
                }]

        }).state('register', {
            url: '/register',
            templateUrl: '/register.html',
            controller: 'AuthController',
            controllerAs: 'ctrl',
                onEnter: ['$state', 'authService', function($state, authService) {
                    if (authService.isLoggedIn()) {
                        $state.go('trainings');
                    }
                }]

        });
        $urlRouterProvider.otherwise('login');
    };

})();
