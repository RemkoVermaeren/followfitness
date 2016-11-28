(function() {
    'use strict';

    angular.module('followFitnessApp').factory('exerciseService', exerciseService);

    exerciseService.$inject = ['$log', '$http', 'authService'];

    function exerciseService($log, $http, authService) {

        var trainingId;
        return {
            getAll: getAll,
            create: create,
            setTrainingId: setTrainingId
            // get: get,
            // update: update,
        };

        activate();

        function activate(){
            return getAll();
        }
        function getAll() {
            var user = authService.currentUserId();
            return $http.get('/api/' +  user + "/trainings/" + trainingId).success(function(data) {
                return data.data;
            });
        }

        function create(exercise){
            var user = authService.currentUserId();
            exercise.sets = Object.keys(exercise.sets).map(function (key) { return exercise.sets[key];});
            return $http.post('/api/' + user + '/trainings/' + trainingId, exercise).success(function(data) {
                return data;
            });
        }
        function setTrainingId(id){
            trainingId = id;
            $log.log("Training id is set to :" + id);
        }
    }


})();
