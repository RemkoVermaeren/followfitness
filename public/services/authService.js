(function() {

    'use strict';

    angular.module('followFitnessApp').factory('authService', authService);

    authService.$inject = ['$http', '$window', '$log'];

    function authService($http, $window, $log) {
        var auth = {
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
            register: register,
            logIn: logIn,
            logOut: logOut,
            currentUserId: currentUserId
        };
        return auth;

        function saveToken(token) {
            $window.localStorage['followfitness-app-token'] = token;
        }

        function getToken() {
            return $window.localStorage['followfitness-app-token'];
        }
        function isLoggedIn() {
            var token = getToken();

            if (token) {
                var payload = angular.fromJson($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }
        function currentUser() {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = angular.fromJson($window.atob(token.split('.')[1]));
                return payload.username;
            }
        }
        function currentUserId(){
            if (isLoggedIn()) {
                var token = getToken();
                var payload = angular.fromJson($window.atob(token.split('.')[1]));
                return payload._id;
            }
        }
        function register(user) {
            return $http.post('/register', user).success(function(data) {
                auth.saveToken(data.token);
            });
        }

        function logIn(user) {
            return $http.post('/login', user).success(function(data) {
                auth.saveToken(data.token);
            });
        }
        function logOut(){
            $window.localStorage.removeItem('followfitness-app-token');
        }
    }
})();
