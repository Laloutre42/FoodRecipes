(function () {
  'use strict';

  angular.module('foodrecipes.sections.signup.controller', [])
    .controller('SignupController',
      ['$rootScope', '$log', 'AuthenticationService',
        function ($rootScope, $log, AuthenticationService) {

          var vm = this;
          vm.postSignUpForm = postSignUpForm;

          getSignUpFormFromConnection();

          function getSignUpFormFromConnection() {
            AuthenticationService.getSignUpFormFromConnection()
              .then(
                function (response) {
                  if (typeof response !== 'undefined') {

                    vm.credentials = {};
                    vm.credentials.name = (typeof response.name !== 'undefined') ? response.name : undefined;
                    vm.credentials.email = (typeof response.email !== 'undefined') ? response.email : undefined;
                    vm.credentials.fullName = (typeof response.fullName !== 'undefined') ? response.fullName : undefined;

                  }
                });
          }

          function postSignUpForm() {
            if (typeof vm.credentials !== 'undefined' && vm.credentials !== {}) {
              AuthenticationService.postSignUpForm(vm.credentials);
            }
          }


        }]);
})();
