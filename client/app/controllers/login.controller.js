'use strict';
(function () {

  var loginController = function loginController(DataFactory,$state) {
    var vm = this;
    vm.user = {};
    vm.login = function(){
      if(!vm.user.email || !vm.user.password){
        return;
      }
      DataFactory.doLogin(vm.user).then(function(data){
          $state.go('home');
      });
    }

  };


  angular.module('coderDecoder2App').controller('LoginController', [ 'DataFactory','$state',loginController]);

})();