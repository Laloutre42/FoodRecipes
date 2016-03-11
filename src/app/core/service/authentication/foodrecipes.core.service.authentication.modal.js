(function () {
  'use strict';

  angular.module('foodrecipes.core.service.authentication.modal', [])
    .service('AuthenticationModalService', function ($uibModal) {

      var AuthenticationModalService = {
        openModalForSignIn: openModalForSignIn,
        openModalForSignUp: openModalForSignUp
      };

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

      return AuthenticationModalService;
    });
})();
