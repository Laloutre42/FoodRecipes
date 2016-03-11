(function () {
  'use strict';

  angular.module('foodrecipes.components.navbar.directive', [])
    .directive('navBarDirective', ['$rootScope', 'moment', '$log', 'SessionService', 'LIST_MODE', 'ENV', 'AuthenticationModalService',
      function ($rootScope, moment, $log, SessionService, LIST_MODE, ENV, AuthenticationModalService) {

        var directive = {
          restrict: 'E',
          templateUrl: 'app/components/navbar/navbar.html',
          scope: {
            creationDate: '='
          },
          controller: [NavbarController],
          controllerAs: 'vm',
          bindToController: true
        };

        return directive;

        function NavbarController() {

          var vm = this;
          vm.LIST_MODE = LIST_MODE;
          vm.ENV = ENV;
          vm.authGoogleAction = vm.ENV.serverName + "/auth/google";
          vm.authFacebookAction = vm.ENV.serverName + "/auth/facebook";
          vm.logoutAction = vm.ENV.serverName + "/api/logout";
          vm.relativeDate = moment(vm.creationDate).fromNow();
          vm.openModalForSignIn = AuthenticationModalService.openModalForSignIn;
          vm.openModalForSignUp = AuthenticationModalService.openModalForSignUp;

          $rootScope.$watch(function () {
              return SessionService.getUser();
            },
            function () {
              vm.user = SessionService.getUser();
              $log.debug("[NavbarController] User is ", vm.user);
            }, true);

        }

      }]);

})();

