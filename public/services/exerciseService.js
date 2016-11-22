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
            var user = authService.currentUser();
            return $http.get('/api/' +  user + "/trainings/" + trainingId).success(function(data) {
                return data.data;
            });
        }

        function create(exercise){
            var user = authService.currentUser();
            $log.log(exercise);
            exercise.sets = Object.keys(exercise.sets).map(function (key) { return exercise.sets[key];});
            // exercise.repeats = Object.keys(exercise.weights).map(function (key) { return exercise.repeats[key];});

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
