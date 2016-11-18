(function() {

    'use strict';

    angular.module('followFitnessApp').controller('TrainingController', TrainingController);

    TrainingController.$inject = ['$log', 'trainingService', 'auth', '$state', '$stateParams'];

    function TrainingController($log, trainingService, auth, $state, $stateParams) {
        var vm = this;
        //vm.isLoggedIn = authService.isLoggedIn;
        vm.trainings = [];
        vm.training;
        vm.getTrainings = getTrainings;


        function getTrainings() {
            $log.log("get training in ctrl");
        //     return trainingService.getAll()
        //         .then(function(data) {
        //             $log.log("getTrainings in TrainingsController was called")
        //             vm.training = data.data;
        //             return vm.trainings;
        //         });
         }
    }



})();
