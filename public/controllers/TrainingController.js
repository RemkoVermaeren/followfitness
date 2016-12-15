(function () {

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
        vm.getTraining = getTraining;
        vm.editTraining = editTraining;
        vm.deleteTraining = deleteTraining;
        vm.convertDate = convertDate;
        vm.reverseIsCompleted = reverseIsCompleted;
        activate();


        function activate() {
            return getTrainings()
        }

        function getTraining() {
            return trainingService.get($stateParams.id).then(function (data) {
                vm.training = data.data;
                convertDate();
            });
        }

        function editTraining() {
            return trainingService.editTraining($stateParams.id, vm.training).then($state.go('trainings'));
        }

        function deleteTraining() {
            return trainingService.deleteTraining($stateParams.id).then($state.go('trainings'));
        }

        function getTrainings() {
            return trainingService.getAll()
                .then(function (data) {
                    vm.trainings = data.data;
                    return vm.trainings;
                });
        }

        function addTraining() {
            return trainingService.create(vm.training).success(function (data) {
                vm.trainings.push(data.data);
            }).then(function () {
                getTrainings()
            });
        }

        function reverseIsCompleted(training) {
            return trainingService.reverseIsCompleted(training._id).success(function(data){
                training.isCompleted = !training.isCompleted;
            });
        }

        function convertDate() {
            var date = vm.training.date;
            vm.training.date = new Date(date);
        }
    }


})();
