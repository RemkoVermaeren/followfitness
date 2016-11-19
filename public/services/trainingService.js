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

        // function create(restaurant) {
        //     return $http.post('/api/restaurants', restaurant, {
        //         headers: {
        //             Authorization: 'Bearer' + authService.getToken()
        //         }
        //     }).success(function(data) {
        //         // push data on array of resto in factory
        //         return data;
        //     });
        // };
        //
        // function get(id) {
        //     return $http.get('/api/restaurants/' + id).then(function(res) {
        //         return res.data;
        //     });
        // };
        //
        // function update(id, restaurant) {
        //     $log.log("update in restaurantService was called")
        //     return $http.put('/api/restaurants/' + id, restaurant, {
        //         headers: {
        //             Authorization: 'Bearer' + authService.getToken()
        //         }
        //     }).success(function(data) {
        //         return data;
        //     });
        //
        // };
        //
        // function deleteRestaurant(restaurant) {
        //     return $http.delete('/api/restaurants/' + restaurant._id, {
        //         headers: {
        //             Authorization: 'Bearer' + authService.getToken()
        //         }
        //     }).then(function(res) {
        //         return res.data;
        //     })
        // };
    }


})();
