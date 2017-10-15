'use strict';
(function () {

  var loginController = function loginController(DataFactory,$state,ngToast) {
    var vm = this;
    vm.user = {};
    vm.login = function(){
      if(!vm.user.email || !vm.user.password){
        ngToast.create('Fields can\'t be empty');
        return;
      }
      DataFactory.doLogin(vm.user).then(function(data){
          $state.go('home');
      });
    }

  };


  angular.module('coderDecoder2App').controller('LoginController', [ 'DataFactory','$state','ngToast',loginController]);

})();