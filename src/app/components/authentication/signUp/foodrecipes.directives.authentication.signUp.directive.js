(function () {
  'use strict';

  angular.module('foodrecipes.components.authentication.signUp.directive', ['foodrecipes.components.authentication.signUp.modal'])
    .directive('authenticationSignUpDirective', function () {

      var directive = {
        restrict: 'E',
        templateUrl: 'app/components/authentication/signUp/signUp.html',
        scope: {},
        controller: AuthenticationSignUpController,
        controllerAs: 'vm',
        bindToController: true
      };

      return directive;

      function AuthenticationSignUpController($rootScope, $log, AUTH_EVENTS, AuthenticationService) {
        var vm = this;

        vm.signUp = signUp;

        vm.credentials = {
          name: '',
          password: '',
          email: ''
        };

        function signUp(credentials) {
          AuthenticationService.signUp(credentials).then(
            function (user) {
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
              $rootScope.currentUser = user;
            },
            function () {
              $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        }

      }

    });

})();

