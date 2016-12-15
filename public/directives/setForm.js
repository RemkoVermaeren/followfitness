angular.module('followFitnessApp').directive('setForm',
    function() {
        return {
            restrict: 'E',
            replace: true,
            controller: 'ExerciseController',
            controllerAs: 'ctrl',
            bindToController : true,
            templateUrl: 'directives/set-form.html'
        }
    }
);