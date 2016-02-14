(function () {
  'use strict';

  angular.module('foodrecipes.components.navbar.directive', [])
    .directive('navBarDirective', ['$rootScope', 'moment', '$log', 'SessionService', 'LIST_MODE',
      function ($rootScope, moment, $log, SessionService, LIST_MODE) {

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

          $rootScope.$watch('SessionService.getUser()', function () {
            vm.user = SessionService.getUser();
            $log.debug("[NavbarController] User is ", vm.user);
          });

          vm.relativeDate = moment(vm.creationDate).fromNow();
        }

      }]);

})();

