'use strict';

(function(){

  var DataFactory = function($http,$q,$cookies,$state,ngToast){

    var allPost = [];
    var isLoggedIn = " ";
    return {
        getAllTasks: function(){
          var deferred = $q.defer();
          var response = []
          $http.get('/api/').then(function(data){

              // console.log(data.data["data"])
              var arr =  data.data["data"]
              if(arr){
                  arr.forEach(function(element) {
                    var obj ={};
                    obj["post"] = element["post"]
                    var second = JSON.parse(element["task"]);
                      // console.log("second " +second)
                      
                    for(var prop in second){
                      
                      obj[prop] = second[prop]
                      // console.log(prop,second[prop])
                    }
                    response.push(obj);
                });
              }
             
              
              deferred.resolve(response);  
          },function(data, status, headers, config) {
            deferred.reject("Error: request returned status " + status); 
          });

          return deferred.promise;
        },
        addTask: function(task){
          var deferred = $q.defer();
          console.log(task)
          $http.post('/api/',{"text":task["newTask"],"imageUrl":task["imageUrl"]}).then(function(data){
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
        updateTodo: function(text,postID,imageUrl){
          var deferred = $q.defer();
          $http.put('/api/',{},{params: {'_id':postID.substring(5),'text': text,'imageUrl':imageUrl} }).then(function(data){
            deferred.resolve();
          },function(data, status, headers, config) {
            deferred.reject("Error: request returned status " + status); 
          });
          return deferred.promise;
        },
        doRegister: function(user){
          var deferred = $q.defer();
          $http.post('/signup',{"email":user.email,"password":user.password}).then(function(res){
            $cookies.put('token', res.data["token"]);
            $cookies.put('user', res.data["user"]);
            isLoggedIn = res.data["user"];
             deferred.resolve(res);
          },function(data, status, headers, config) {
            ngToast.create(data.data.message);
            deferred.reject("Error: request returned status " + status); 
          });
          return deferred.promise;
        },

      getToken : function getToken() {
         return $cookies.get('token');
      },
      doLogin: function(user){
        var deferred = $q.defer();
       
        $http.post('/login',{"email":user.email,"password":user.password}).then(function(res){
          $cookies.put('token', res.data["token"]);
          $cookies.put('user', res.data["user"]);
          isLoggedIn = res.data["user"];
           deferred.resolve(res);
        },function(data, status, headers, config) {
          ngToast.create(data.data.message);
          console.log(data);
          deferred.reject("Error: request returned status " + status); 
        });
        return deferred.promise;
        },
      doLogout: function(){
        $cookies.remove('token');
        $cookies.remove('user');
        isLoggedIn = ""
        $state.reload();
      }
    }
  };

angular.module('coderDecoder2App').factory('DataFactory', ['$http','$q','$cookies','$state','ngToast', DataFactory]);

})();

