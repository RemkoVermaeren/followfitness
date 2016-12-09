(function() {
    'use strict';

    angular.module('followFitnessApp').factory('machineService', machineService);

    machineService.$inject = ['$log', '$http', 'authService'];

    function machineService($log, $http, authService) {

        return {
            getAll: getAll,
            get: get
        };

        function getAll() {
            var user = authService.currentUserId();
            return $http.get('/api/' +  user + '/machines').success(function(data) {
                return data.data;
            });
        }

        function get(id) {
            var user = authService.currentUserId();
            return $http.get('/api/' +  user + '/machines/' + id).success(function(data) {
                return data.data;
            });
        }

    }


})();
