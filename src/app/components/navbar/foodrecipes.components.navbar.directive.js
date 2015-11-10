(function () {
  'use strict';

  angular.module('foodrecipes.components.navbar.directive', [])
    .directive('navBarDirective', ['AuthenticationService', function (AuthenticationService) {

      var directive = {
        restrict: 'E',
        templateUrl: 'app/components/navbar/navbar.html',
        scope: {
          creationDate: '='
        },
        controller: ['$rootScope', 'moment', '$log', '$modal', 'SessionService', NavbarController],
        controllerAs: 'vm',
        bindToController: true
      };

      return directive;

      function NavbarController($rootScope, moment, $log, $modal, SessionService) {
        var vm = this;

        $rootScope.$watch('SessionService.getUser()', function () {
          vm.user = SessionService.getUser();
          $log.debug("[NavbarController] User is ", vm.user);
        });


        vm.relativeDate = moment(vm.creationDate).fromNow();
        vm.openModalForSignIn = openModalForSignIn;
        vm.openModalForSignUp = openModalForSignUp;
        vm.logOut = logOut;

        function openModalForSignIn() {

          $modal.open({
            animation: true,
            templateUrl: 'app/components/authentication/login/modal/login.html',
            controller: 'LoginModalController',
            size: 'md'
          });
        }

        function openModalForSignUp() {

          $modal.open({
            animation: true,
            templateUrl: 'app/components/authentication/signUp/modal/signUp.html',
            controller: 'SignUpModalController',
            size: 'md'
          });
        }

        function logOut(){
          AuthenticationService.logOut();
        }

      }

    }]);

})();

