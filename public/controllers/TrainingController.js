(function() {

    'use strict';

    angular.module('followFitnessApp').controller('TrainingController', TrainingController);

    TrainingController.$inject = ['$log', 'trainingService', 'authService', '$state', '$stateParams'];

    function TrainingController($log, trainingService, authService, $state, $stateParams) {
        var vm = this;
        //vm.isLoggedIn = authService.isLoggedIn;
        vm.trainings = [];
        vm.training;
        vm.getTrainings = getTrainings;
        vm.addTraining = addTraining;


        activate();


        function activate() {
            return getTrainings()
        }

        function getTrainings() {
            return trainingService.getAll()
                .then(function(data) {
                    vm.trainings = data.data;
                    return vm.trainings;
                });
         }

         function addTraining() {
             return trainingService.create(vm.training).then(function(data){
                 vm.trainings.push(data.data);
             });
         }
    }



})();
