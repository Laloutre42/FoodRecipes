(function () {
  'use strict';

  angular.module('foodrecipes.core.service.authentication', [])
    .factory('AuthenticationService', ['$rootScope', '$cookies', '$log', '$http', 'USER_ROLES', 'AUTH_EVENTS', 'ENV', 'SessionService',
      function ($rootScope, $cookies, $log, $http, USER_ROLES, AUTH_EVENTS, ENV, SessionService) {
      var AuthenticationService = {

        //login: function (credentials) {
        //
        //  var headers = credentials ? {authorization: "Basic " + btoa(credentials.name + ":" + credentials.password)} : {};
        //
        //  $http
        //    .get('/api/user/principalUser', {headers: headers})
        //    .then(
        //    function (response) {
        //      //SessionService.create(response.data.id, response.data.id, response.data.role);
        //
        //      $log.debug("[AuthenticationService][login] response ok ", response);
        //
        //      if (response.data.name) {
        //        $rootScope.authenticated = true;
        //        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        //        //$rootScope.currentUser = user;
        //      } else {
        //        $rootScope.authenticated = false;
        //        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        //      }
        //    },
        //    function (response) {
        //      $log.error("[AuthenticationService][login] response error ", response);
        //      $rootScope.authenticated = false;
        //      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        //    });
        //},

        //signUp: function (credentials) {
        //  return $http
        //    .post('/api/user/signUp', credentials)
        //    .then(function (res) {
        //      SessionService.create(res.data.id, res.data.id, res.data.role);
        //      return res.data;
        //    });
        //},

        isAuthenticated: function () {
          return !!SessionService.getUser();
        },

        isAuthorized: function (authorizedRoles) {
          if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
          }
          return ((AuthenticationService.isAuthenticated() && authorizedRoles.indexOf(SessionService.getUser().role) !== -1) ||
          (authorizedRoles.indexOf(USER_ROLES.guest) !== -1) ||
          (authorizedRoles.indexOf(USER_ROLES.all) !== -1));
        },

        logOut: function () {

          $http
            .post(ENV.apiEndpoint + '/logout')
            .then(
            function (response) {
              $log.error("[AuthenticationService][logOut] response ok ", response);
              $rootScope.authenticated = false;
            },
            function (response) {
              $log.error("[AuthenticationService][logOut] response error ", response);
              $rootScope.authenticated = false;
            });
        },

        authenticationCheck: function () {
          return $http
            .get(ENV.apiEndpoint + '/authenticationCheck')
            .then(
            function (response) {
              $log.debug("[AuthenticationService][authenticationCheck] Authenticated OK");

              SessionService.create(response.data.id, response.data.name, response.data.role, response.data.email);
              $rootScope.authenticated = true;
            },
            function () {
              $log.debug("[AuthenticationService][authenticationCheck] NOT authenticated");
              $rootScope.authenticated = false;
            });
        }

      };

      return AuthenticationService;
    }]);
})();
