'use strict';

angular.module('coderDecoder2App', [
    'ui.router'
  ])

  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider','$locationProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {


    $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');
    $urlRouterProvider
      .otherwise('/');
    $stateProvider
      
 
      .state('home', {
        url: '/',
        templateUrl: 'app/todo.html',
        controller: 'TodoController as vm',
        resolve: {
          fetchTodoList: [ 'DataFactory', function (DataFactory) {

            
             return DataFactory.getAllTasks()
          }]
        }

      })

  }])
;





