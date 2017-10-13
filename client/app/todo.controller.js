'use strict';
(function () {

  var todoController = function todoController(DataFactory) {
    var vm = this;
    // fetchTodoList.then(function (data) {
    //       console.log(data)
          
    //   });
    vm.task = [];
    DataFactory.getAllTasks().then(function(data){
      vm.tasks = data;
    });

    vm.newTask = ""
    vm.addTask = function(){
      if(!vm.newTask){
        return
      }
      DataFactory.addTask(vm.newTask).then(function(data){
        DataFactory.getAllTasks().then(function(data){
          vm.tasks = data;
        });
        vm.newTask = ""
      });
      
    }
    vm.removeTask = function($index,postId){
      DataFactory.deleteTask(postId).then(function(data){
        DataFactory.getAllTasks().then(function(data){
          vm.tasks = data;
        });
      });
    }
    



  };


  angular.module('coderDecoder2App').controller('TodoController', [ 'DataFactory',todoController]);

})();








