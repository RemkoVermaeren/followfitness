(function() {

    'use strict';

    angular.module('followFitnessApp').controller('ExerciseController', ExerciseController);

    ExerciseController.$inject = ['$log', 'exerciseService', 'authService', '$state', '$stateParams'];

    function ExerciseController($log, exerciseService, authService, $state, $stateParams) {
        var vm = this;
        vm.numberOfSets = 1;
        vm.exercises = [];
        vm.exercise;
        vm.machines = [];
        vm.getExercises = getExercises;
        vm.getExercise = getExercise;
        vm.addExercise = addExercise;
        vm.deleteExercise = deleteExercise;
        vm.editExercise = editExercise;

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
        function getExercise() {
            return exerciseService.get($stateParams.exerciseid).then(function(data){
                vm.exercise = data.data;
                vm.numberOfSets = vm.exercise.sets.length;
            });
        }
        function deleteExercise() {
            return exerciseService.deleteExercise($stateParams.exerciseid);
        }

        function editExercise(){
            return exerciseService.editExercise($stateParams.exerciseid, vm.exercise,vm.numberOfSets);
        }
    }



})();
