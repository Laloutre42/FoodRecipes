(function () {
  'use strict';

  angular.module('foodrecipes.components.authentication.signUp.modal', [])
    .controller('SignUpModalController', ['$rootScope', '$scope', '$log', 'AUTH_EVENTS', 'AuthenticationService', '$uibModalInstance',
      function ($rootScope, $scope, $log, AUTH_EVENTS, AuthenticationService, $uibModalInstance) {

        $scope.signUp = signUp;
        $scope.close = close;
        $scope.errorMessage = undefined;

        $scope.credentials = {
          name: '',
          password: '',
          email: ''
        };
        $rootScope.currentUser = null;

        function signUp(credentials) {
          AuthenticationService.signUp(credentials);
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

