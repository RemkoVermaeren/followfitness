(function () {
    'use strict';

    angular.module('followFitnessApp').controller('AuthController', AuthController);

    AuthController.$inject = ['$state', 'authService'];

    function AuthController($state, authService) {
        var vm = this;
        vm.register = register;
        vm.logIn = logIn;
        vm.isLoggedIn = isLoggedIn;
        vm.logOut = logOut;
        vm.currentUser = currentUser;

        function register() {
            authService.register(vm.user).error(function(error) {
                vm.error = error.message;
            }).success(function() {
                $state.go('trainings');
            });
        }

        function logIn() {
            authService.logIn(vm.user).error(function(error) {
                vm.error = error.message;
            }).success(function() {
                $state.go('trainings');
            });
        }

        function isLoggedIn() {
            return authService.isLoggedIn();
        }

        function logOut() {
            return authService.logOut().then(function(){$state.go("login")});

        }

        function currentUser() {
            vm.user = authService.currentUser();
            return vm.user.username;
        }
    }

})();
