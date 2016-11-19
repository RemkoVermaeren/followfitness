(function(){
    'use strict';

    angular.module('followFitnessApp').controller('NavController', NavController);

    NavController.$inject = ['authService'];

    function NavController(authService){
      var vm = this;
      vm.isLoggedIn = authService.isLoggedIn;
      vm.currentUser = authService.currentUser;
      vm.logOut = authService.logOut;
    }

})();
