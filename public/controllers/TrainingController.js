(function() {

    'use strict';

    angular.module('followFitnessApp').controller('TrainingController', TrainingController);

    TrainingController.$inject = ['$log', 'trainingService', 'auth', '$state', '$stateParams'];

    function MainController($log, trainingService, auth, $state, $stateParams) {
        var vm = this;

        //vm.isLoggedIn = authService.isLoggedIn;
        vm.trainings = [];
        vm.training;
        vm.getTrainings = getTrainings;
        // vm.getRestaurants = getRestaurants;
        // vm.getRestaurant = getRestaurant;
        // vm.addRestaurant = addRestaurant;
        // vm.modifyRestaurant = modifyRestaurant;
        // vm.deleteRestaurant = deleteRestaurant;
        // vm.convertDate = convertDate;

        //activate();


        // function activate() {
        //     return getTrainings().then(function() {
        //         $log.log("Restaurants were retrieved");
        //     });
        // };

        function getTrainings() {
            return trainingService.getAll()
                .then(function(data) {
                    $log.log("getTrainings in TrainingsController was called")
                    vm.training = data.data;
                    return vm.trainings;
                });
        }
    }



})();
