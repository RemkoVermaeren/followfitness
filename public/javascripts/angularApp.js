(function() {

    'use strict';

    angular.module('followFitnessApp').config(followFitnessState)

    followFitnessState.$inject = ['$stateProvider', '$urlRouterProvider']

    function followFitnessState($stateProvider, $urlRouterProvider) {
        // $stateProvider.state('home', {
        //     url: '/home',
        //     templateUrl: '/home.html',
        //     controller: 'MainController',
        //     controllerAs: 'ctrl',
        //     resolve: {
        //         trainingPromise: ['traingingService', function(trainingService) {
        //             return trainingService.getAll();
        //         }]
        //     },
        //     onEnter: ['$state', 'auth',
        //         function($state, auth) {
        //         if (!auth.isLoggedIn()) {
        //             $state.go('login');
        //         }
        //     }]
        // })
            $stateProvider.state('trainings', {
                url: '/trainings',
                templateUrl: '/trainings.html',
                controller : 'TrainingController',
                controllerAs : 'ctrl',
                onEnter: ['$state', 'authService', function($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go('login');
                    }
                }]
                // resolve: {
                //     trainings: ['$stateParams', 'trainingService', function($stateParams, trainingService) {
                //         return trainingService.getAll();
                //     }]
                // }
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
