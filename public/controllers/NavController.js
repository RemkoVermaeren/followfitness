(function () {
    'use strict';

    angular.module('followFitnessApp').controller('NavController', NavController);

    NavController.$inject = ['authService', '$state'];

    function NavController(authService, $state) {
        var vm = this;
        vm.isLoggedIn = authService.isLoggedIn;
        vm.currentUser = authService.currentUser;
        vm.logOut = logOut;

        function logOut() {

                $state.go('register').then(function(){authService.logOut()});

        }
    }

})();
