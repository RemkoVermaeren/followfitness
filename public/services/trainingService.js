(function() {
    'use strict';

    angular.module('followFitnessApp').factory('trainingService', trainingService);

    trainingService.$inject = ['$log', '$http', 'authService'];

    function trainingService($log, $http, authService) {

        return {
            getAll: getAll,
            create: create,
            get: get,
            editTraining: editTraining,
            deleteTraining: deleteTraining,
            reverseIsCompleted: reverseIsCompleted
        };

        function getAll() {
            // var user = authService.currentUserId();
            var user = 1;
            return $http.get('/api/' +  user + '/trainings').success(function(data) {
                return data.data;
            });
        }

        function get(id) {
            // var user = authService.currentUserId();
            var user = 1;
            return $http.get('/api/' +  user + '/trainings/' + id).success(function(data) {
                return data.data;
            });
        }

        function create(training){
            var user = authService.currentUserId();
            $log.log(user);
            $log.log(training);
            return $http.post('/api/' + user + '/trainings', training).success(function(data) {
                return data;
            });
        }

        function editTraining(id, training){
            var user = authService.currentUserId();
            return $http.put('/api/' + user + '/trainings/'+ id ,training).success(function(data){
                return data;
            })
        }

        function deleteTraining(id){
            var user = authService.currentUserId();
            return $http.delete('/api/' + user + '/trainings/'+ id).success(function(data){
                return data;
            })
        }
        function reverseIsCompleted(training){
            var user = authService.currentUserId();
            return $http.put('/api/' + user + '/trainings/'+ training._id + '/reverseiscompleted' ,null).success(function(data){
                training.isCompleted = !training.isCompleted;
            })
        }
    }


})();
