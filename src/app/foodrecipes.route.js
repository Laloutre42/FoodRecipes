(function () {
  'use strict';

  angular.module('foodrecipes.route', [])
    .config(['$stateProvider','$urlRouterProvider', '$httpProvider', '$locationProvider', 'USER_ROLES', 
      function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, USER_ROLES) {
      $stateProvider
        .state('main', {
          templateUrl: 'app/sections/main/main.html',
          controller: 'MainController as vm'
        })
        .state('main.home', {
          url: '/',
          templateUrl: 'app/sections/home/home.html'
        })
        .state('main.about', {
          url: '/about',
          templateUrl: 'app/sections/about/about.html'
        })

        // Foodlist
        .state('main.recipes', {
          url: '/recipes',
          templateUrl: 'app/sections/recipes/recipes.html',
          controller: 'RecipesController as vm',
          data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
          }
        })
      ;

      /* The custom "X-Requested-With" is a conventional header sent by browser clients, and it used to be the default in Angular but they took it out in 1.3.0.
      Spring Security responds to it by not sending a "WWW-Authenticate" header in a 401 response, and thus the browser will not pop up an authentication dialog
      (which is desirable in our app since we want to control the authentication). */
      $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

      // use the HTML5 History API
      $locationProvider.html5Mode(true);      

      $urlRouterProvider.otherwise('/');
    }]);
})();
