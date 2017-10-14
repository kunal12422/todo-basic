'use strict';
(function () {

  var todoController = function todoController(DataFactory,Upload) {
    var vm = this;
   
    vm.file = null;
    vm.tasks = [];
    vm.editedTodo = null;
    vm.originalVal = "";
    vm.editedText = "";
    vm.user={};
    DataFactory.getAllTasks().then(function(data){
      vm.tasks = data;
      
    });

    vm.newTask = ""
    vm.addTask = function(){
      if(!vm.user.newTask || !vm.file){
        return;
      }
      
      Upload.upload({
        url:'/api/image',
        data: {file:vm.file }
      }).then(function(res){
        vm.user.imageUrl=res.data.filename
        // console.log(vm.user.imageUrl);
        console.log("image suceess");
        DataFactory.addTask(vm.user).then(function(data){
          DataFactory.getAllTasks().then(function(data){
            vm.tasks = data;
          });
        
           vm.user.newTask = ""
        });
      })
      
      
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
      var imageUrl = todo.imageUrl;
      console.log(postId,vm.editedText);
      DataFactory.updateTodo(vm.editedText,postId,imageUrl).then(function(data){
        DataFactory.getAllTasks().then(function(data){
          vm.tasks = data;
          vm.editedText = "";
          vm.editedTodo = null;
        });
      });
      
    }
  



  };


  angular.module('coderDecoder2App').controller('TodoController', [ 'DataFactory','Upload',todoController]);

})();








