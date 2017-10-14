'use strict';
(function () {

  var registerController = function registerController(DataFactory,$state) {
    var vm = this;

    vm.user = {};
    // vm.user.email="";
    // vm.user.password="";
    // vm.user.cpassword="";
  
    vm.register = function(){
      if(!vm.user.email || !vm.user.password || !vm.user.cpassword) return;
      if(vm.user.password != vm.user.cpassword){
          console.log("Password Not matched");
          return;
      }
    
      DataFactory.doRegister(vm.user).then(function(data){
          $state.go('home');
      });
    }

  };


  angular.module('coderDecoder2App').controller('RegisterController', [ 'DataFactory','$state',registerController]);

})();