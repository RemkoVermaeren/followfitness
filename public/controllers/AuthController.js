(function () {
    'use strict';

    angular.module('followFitnessApp').controller('AuthController', AuthController);

    AuthController.$inject = ['$state', 'auth', '$log'];

    function AuthController($state, auth, $log) {
        var vm = this;
        vm.register = register;
        vm.logIn = logIn;
        vm.isLoggedIn = isLoggedIn;
        vm.logOut = logOut;
        vm.currentUser = currentUser;

        //activate();

        // function activate() {
        //     return getAll().then(function () {
        //         $log.log("Users were retrieved");
        //     });
        // }
        function register() {
            $log.log(vm.user);
            auth.register(vm.user).error(function (error) {
                $log.log("ERROR " + error);
                vm.error = error;
                vm.message = error.message;
            }).then(function () {
               // $state.go('home');
                $log.log(vm.user);

            });
        }
        function logIn() {
            auth.logIn(vm.user).error(function (error) {
                vm.error = error;
                $log.log(error);
                vm.message = error.message;
            }).then(function () {
                $log.log(vm.user);
               // $state.go('home');
            });
        }
        function isLoggedIn() {
            return auth.isLoggedIn();
        }

        function logOut() {
            auth.logOut();
        }

        function currentUser() {
            var data = auth.currentUser();
            vm.user = auth.currentUser();
            $log.log(currentUser);
            $log.log("Currentuser: " + vm.user.username);
            return vm.user.username;
        }

        function getAll() {
            return auth.getAll()
                .then(function (data) {
                    $log.log("getUsers in Auth was called");
                    vm.users = data.data;
                    return vm.users;
                });
        }
    }

})();
