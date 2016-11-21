(function() {
    'use strict';

    angular.module('followFitnessApp').factory('trainingService', trainingService);

    trainingService.$inject = ['$log', '$http', 'authService'];

    function trainingService($log, $http, authService) {


        var service = {
            getAll: getAll,
            create: create
            // get: get,
            // update: update,
        };
        return service;

        function getAll() {
            var user = authService.currentUser();
            return $http.get('/api/' +  user + "/trainings").success(function(data) {
                return data.data;
            });
        }

        function create(training){
            var user = authService.currentUser();
            $log.log(user);
            $log.log(training);
            return $http.post('/api/' + user + '/trainings', training).success(function(data) {
                return data;
            });
        }
    }


})();
