'use strict';
(function () {

  var todoController = function todoController(DataFactory) {
    var vm = this;
    // fetchTodoList.then(function (data) {
    //       console.log(data)
          
    //   });
    vm.tasks = [];
    vm.editedTodo = null;
    vm.originalVal = "";
    vm.editedText = "";
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
    vm.editTodo = function (todo) {
			vm.editedTodo = todo;
			
			vm.originalVal = angular.extend({}, todo);
		};
    vm.saveEdits = function(todo){
      if(vm.editedText == vm.originalVal.text){
        vm.editedTodo = null;
        return;
      }
      if(vm.editedText == ""){
        vm.editedTodo = null;
          return;
      }
      var postId = todo.post;
      console.log(postId,vm.editedText);
      DataFactory.updateTodo(vm.editedText,postId).then(function(data){
        DataFactory.getAllTasks().then(function(data){
          vm.tasks = data;
          vm.editedText = "";
          vm.editedTodo = null;
        });
      });
      
    }
  



  };


  angular.module('coderDecoder2App').controller('TodoController', [ 'DataFactory',todoController]);

})();








