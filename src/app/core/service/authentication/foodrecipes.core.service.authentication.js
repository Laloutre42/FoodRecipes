(function () {
  'use strict';

  angular.module('foodrecipes.core.service.authentication', [])
    .factory('AuthenticationService', ['$rootScope', '$cookies', '$log', '$http', 'USER_ROLES', 'AUTH_EVENTS', 'ENV', 'SessionService',
      function ($rootScope, $cookies, $log, $http, USER_ROLES, AUTH_EVENTS, ENV, SessionService) {
        var AuthenticationService = {

          getSignUpFormFromConnection: function () {
            return $http
              .get(ENV.serverName + '/api/signup')
              .then(
                function (response) {
                  $log.debug("[AuthenticationService][getSignUpFormFromConnection] response ", response);
                  return response.data;
                },
                function (errorResponse) {
                  $log.error("[AuthenticationService][getSignUpFormFromConnection] errorResponse ", errorResponse);
                });
          },

          postSignUpForm: function (credentials) {
            return $http
              .post(ENV.serverName + '/api/signup', credentials)
              .then(
                function (response) {
                  $log.debug("[AuthenticationService][postSignUpForm] response ", response);
                  return response.data;
                },
                function (errorResponse) {
                  $log.error("[AuthenticationService][postSignUpForm] errorResponse ", errorResponse);
                });
          },

          login: function (credentials) {

            $http
              .post('/api/user/login', credentials)
              .then(
                function (response) {

                  $log.debug("[AuthenticationService][login] response ok ", response);

                  if (response.data.name) {
                    $log.debug("[AuthenticationService][login] response.data.name is ", response.data.name);
                    SessionService.create(response.data.id, response.data.name, response.data.role, response.data.email);
                    $rootScope.authenticated = true;
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                  } else {
                    $log.debug("[AuthenticationService][login] response.data.name is empty, authentication failed ");
                    $rootScope.authenticated = false;
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed, 'Login failed');
                  }
                },
                function (errorResponse) {
                  $log.error("[AuthenticationService][login] response error ", errorResponse);
                  $rootScope.authenticated = false;
                  $rootScope.$broadcast(AUTH_EVENTS.loginFailed, errorResponse.data.message);
                });
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

          signUp: function (credentials) {
            return $http
              .post('/api/user/signUp', credentials)
              .then(
                function (response) {

                  $log.debug("[AuthenticationService][signUp] response ok ", response);

                  if (response.data.name) {
                    SessionService.create(response.data.id, response.data.name, response.data.role, response.data.email);
                    $rootScope.authenticated = true;
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                  } else {
                    $rootScope.authenticated = false;
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed, 'Sign up failed');
                  }
                },
                function (errorResponse) {
                  $log.error("[AuthenticationService][signUp] response error ", errorResponse);
                  $rootScope.authenticated = false;
                  $rootScope.$broadcast(AUTH_EVENTS.loginFailed, errorResponse.data.message);
                });
          },

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
