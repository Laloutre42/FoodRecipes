(function () {
  'use strict';

  angular.module('foodrecipes.components.navbar.directive', [])
    .directive('navBarDirective', ['AuthenticationService', 'ENV',
      function (AuthenticationService, ENV) {

        var directive = {
          restrict: 'E',
          templateUrl: 'app/components/navbar/navbar.html',
          scope: {
            creationDate: '='
          },
          controller: ['$rootScope', 'moment', '$log', '$uibModal', 'SessionService', NavbarController],
          controllerAs: 'vm',
          bindToController: true
        };

        return directive;

        function NavbarController($rootScope, moment, $log, $uibModal, SessionService) {
          var vm = this;

          vm.facebookLogin = ENV.serverName + "/auth/facebook";
          vm.googleLogin = ENV.serverName + "/auth/google";
          vm.logOut = ENV.serverName + "/api/logout";

          $rootScope.$watch('SessionService.getUser()', function () {
            vm.user = SessionService.getUser();
            $log.debug("[NavbarController] User is ", vm.user);
          });


          vm.relativeDate = moment(vm.creationDate).fromNow();
          vm.openModalForSignIn = openModalForSignIn;
          vm.openModalForSignUp = openModalForSignUp;
          vm.logOut = logOut;

          function openModalForSignIn() {

            $uibModal.open({
              animation: true,
              templateUrl: 'app/components/authentication/login/modal/login.html',
              controller: 'LoginModalController',
              size: 'md'
            });
          }

          function openModalForSignUp() {

            $uibModal.open({
              animation: true,
              templateUrl: 'app/components/authentication/signUp/modal/signUp.html',
              controller: 'SignUpModalController',
              size: 'md'
            });
          }

          function logOut() {
            AuthenticationService.logOut();
          }

        }

      }]);

})();

