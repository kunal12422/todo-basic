'use strict';

(function(){

  var DataFactory = function($http,$q){

    var allPost = [];

    return {
        getAllTasks: function(){
          var deferred = $q.defer();

          $http.get('/api/').then(function(data){
            
            // console.log(data.data["data"])

              // var arr = Object.keys(data.data["data"]).map(function(key){
              //     console.log(key)
              //     return {key:data.data["data"][key]};
              // })
              // console.log(arr)

              deferred.resolve(data.data["data"]);  
          },function(data, status, headers, config) {
            deferred.reject("Error: request returned status " + status); 
          });

          return deferred.promise;
        },
        addTask: function(task){
          var deferred = $q.defer();
          
          $http.post('/api/',{"text":task}).then(function(data){
            deferred.resolve();
           },function(data, status, headers, config) {
            deferred.reject("Error: request returned status " + status); 
          });

           return deferred.promise;
        },
        deleteTask: function(postID){
          var deferred = $q.defer();
          console.log(typeof postID.substring(5))
          
          $http.delete('/api/',{params: {'_id':postID.substring(5)} }).then(function(data){
            deferred.resolve();
          },function(data, status, headers, config) {
            deferred.reject("Error: request returned status " + status); 
          });
          return deferred.promise;
        },
        updateTodo: function(text,postID){
          var deferred = $q.defer();
          $http.put('/api/',{},{params: {'_id':postID.substring(5),'text': text} }).then(function(data){
            deferred.resolve();
          },function(data, status, headers, config) {
            deferred.reject("Error: request returned status " + status); 
          });
          return deferred.promise;
        }
    }
  };

angular.module('coderDecoder2App').factory('DataFactory', ['$http','$q', DataFactory]);

})();

