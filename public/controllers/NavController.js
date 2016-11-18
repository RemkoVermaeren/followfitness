(function(){
    'use strict';

    angular.module('followFitnessApp').controller('NavController', NavController);

    NavController.$inject = ['auth'];

    function NavController(auth){
      var vm = this;
      vm.isLoggedIn = auth.isLoggedIn;
      vm.currentUser = auth.currentUser;
      vm.logOut = auth.logOut;
    }

})();
