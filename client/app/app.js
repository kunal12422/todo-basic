'use strict';

angular.module('coderDecoder2App', [
    'ui.router',
    'ngCookies',
    'ngFileUpload'
  ])

  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider','$locationProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    $httpProvider.interceptors.push('authInterceptor');
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
      .state('login', {
        url: '/login',
        templateUrl: 'app/views/login.html',
        controller: 'LoginController as vm'

      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/views/register.html',
        controller: 'RegisterController as vm'

      })

  }])

  .factory('authInterceptor', ['$q', '$cookies', '$injector', function ($q, $cookies, $injector) {
    var state;

    return {
      request: function (config) {
        config.headers = config.headers || {};

        if ($cookies.get('token')) {

          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          
          
          $cookies.remove('token');
           return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }])
;





