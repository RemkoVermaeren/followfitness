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
                url: '/{id}/trainings',
                templateUrl: '/trainings.html',
                controller : 'TrainingController',
                controllerAs : 'ctrl',
                resolve: {
                    menus: ['$stateParams', 'trainingService', function($stateParams, trainingService) {
                        return trainingService.get($stateParams.id);
                    }]
                }
            }).state('login', {
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
        $urlRouterProvider.otherwise('login');
    };

})();
