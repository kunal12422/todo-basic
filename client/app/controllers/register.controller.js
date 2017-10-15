'use strict';
(function () {

  var registerController = function registerController(DataFactory,$state,ngToast) {
    var vm = this;

    vm.user = {};
    // vm.user.email="";
    // vm.user.password="";
    // vm.user.cpassword="";
  
    vm.register = function(){
      if(!vm.user.email || !vm.user.password || !vm.user.cpassword) {
        ngToast.create('Fields can\'t be empty');
        return;
      }
      if(vm.user.password != vm.user.cpassword){
         
          ngToast.create('Password Not matched');
          return;
      }
    
      DataFactory.doRegister(vm.user).then(function(data){
          $state.go('home');
      });
    }

  };


  angular.module('coderDecoder2App').controller('RegisterController', [ 'DataFactory','$state','ngToast',registerController]);

})();