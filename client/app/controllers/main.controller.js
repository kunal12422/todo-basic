

'use strict';
(function () {

  var mainController = function mainController(DataFactory,$cookies,$scope) {
    var vm = this;
    vm.isLoggedIn = $cookies.get('user');

    vm.logout = function(){
        DataFactory.doLogout();
    }
    $scope.$watch(function(){
            return $cookies.get('user')
    }
    , function(nval,oval){
        vm.isLoggedIn = $cookies.get('user');
    })

  };


  angular.module('coderDecoder2App').controller('MainController',[ 'DataFactory','$cookies','$scope',mainController]);

})();