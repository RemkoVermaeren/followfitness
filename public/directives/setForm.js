angular.module('followFitnessApp').directive('setForm',
    function() {
        return {
            restrict: 'E',
            replace: true,
            controller: 'ExerciseController',
            controllerAs: 'ctrl',
            templateUrl: 'directives/set-form.html'
        }
    }
);