(function() {

    'use strict';

    angular.module('followFitnessApp').controller('ExerciseController', ExerciseController);

    ExerciseController.$inject = ['$log', 'exerciseService', 'authService', '$state', '$stateParams'];

    function ExerciseController($log, exerciseService, authService, $state, $stateParams) {
        var vm = this;
        var numberOfSets = 1;
        //vm.isLoggedIn = authService.isLoggedIn;
        vm.exercises = [];
        vm.exercise;
        vm.getExercises = getExercises;
        vm.addExercise = addExercise;


        activate();


        function activate() {
            return getExercises()
        }

        function getExercises() {
            return exerciseService.getAll()
                .then(function(data) {
                    vm.exercises = data.data;
                    return vm.exercises;
                });
        }

        function addExercise() {
            return exerciseService.create(vm.exercise).then(function(data){
                vm.exercises.push(data.data);
            }).then($state.go('trainings'));
        }
    }



})();
