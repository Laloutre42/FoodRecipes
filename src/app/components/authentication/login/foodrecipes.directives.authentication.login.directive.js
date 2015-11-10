(function () {
  'use strict';

  angular.module('foodrecipes.components.authentication.login.directive', ['foodrecipes.components.authentication.login.modal'])
    .directive('authenticationLoginDirective', function () {

      var directive = {
        restrict: 'E',
        templateUrl: 'app/components/authentication/login/login.html',
        scope: {},
        controller: AuthenticationLoginController,
        controllerAs: 'vm',
        bindToController: true
      };

      return directive;

      function AuthenticationLoginController($rootScope, AuthenticationService) {
        var vm = this;

        vm.login = login;

        vm.credentials = {
          name: '',
          password: ''
        };
        $rootScope.currentUser = null;

        function login(credentials) {
          AuthenticationService.login(credentials);
        }

      }

    });

})();

