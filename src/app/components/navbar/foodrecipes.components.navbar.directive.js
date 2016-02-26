(function () {
  'use strict';

  angular.module('foodrecipes.components.navbar.directive', [])
    .directive('navBarDirective', ['$rootScope', 'moment', '$log', 'SessionService', 'LIST_MODE', 'ENV',
      function ($rootScope, moment, $log, SessionService, LIST_MODE, ENV) {

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

          $rootScope.$watch('SessionService.getUser()', function () {
            vm.user = SessionService.getUser();
            $log.debug("[NavbarController] User is ", vm.user);
          });

          vm.relativeDate = moment(vm.creationDate).fromNow();
        }

      }]);

})();

