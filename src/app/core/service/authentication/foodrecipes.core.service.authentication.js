(function () {
  'use strict';

  angular.module('foodrecipes.core.service.authentication', [])
    .factory('AuthenticationService', ['$rootScope', '$cookies', '$log', '$http', 'USER_ROLES', 'AUTH_EVENTS', 'ENV', 'SessionService',
      function ($rootScope, $cookies, $log, $http, USER_ROLES, AUTH_EVENTS, ENV, SessionService) {
        var AuthenticationService = {

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

          authenticationCheck: function () {
            return $http
              .get(ENV.serverName + '/api/authenticationCheck')
              .then(
                function (response) {
                  $log.debug("[AuthenticationService][authenticationCheck] Authenticated OK");

                  SessionService.create(response.data.id, response.data.name, response.data.role, response.data.email);
                  $rootScope.authenticated = true;
                  $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                },
                function () {
                  $log.debug("[AuthenticationService][authenticationCheck] NOT authenticated");
                  $rootScope.authenticated = false;
                  $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
          }

        };

        return AuthenticationService;
      }]);
})();
