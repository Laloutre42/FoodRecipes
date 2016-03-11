(function () {
  'use strict';

  angular.module('foodrecipes.components.authentication.login.modal', [])
    .controller('LoginModalController', ['$rootScope', '$scope', '$log', 'AUTH_EVENTS', 'AuthenticationService', '$uibModalInstance',
      function ($rootScope, $scope, $log, AUTH_EVENTS, AuthenticationService, $uibModalInstance) {

        $scope.login = login;
        $scope.close = close;
        $scope.errorMessage = undefined;

        $scope.credentials = {
          email: '',
          password: ''
        };
        $rootScope.currentUser = null;

        function login(credentials) {
          AuthenticationService.login(credentials);
        };

        // Cancel modal
        function close() {
          $uibModalInstance.close();
        };

        $rootScope.$on(AUTH_EVENTS.loginFailed, function (event, errorMessage) {
          $log.debug(errorMessage);
          toastr.error(errorMessage);
        });

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
          $scope.close();
        });

      }]);
})();

