(function () {
  'use strict';

  angular
    .module('foodrecipes')
    // !! LocaleService is used to get locale (instead with have an undefined, don't remove
    .run(['$filter', '$log', '$rootScope', 'AUTH_EVENTS', 'USER_ROLES', 'AuthenticationService', 'LocaleService', runBlock]);

  /** @ngInject */
  function runBlock($filter, $log, $rootScope, AUTH_EVENTS, USER_ROLES, AuthenticationService, LocaleService) {

    //// Check authentication on server side to see if user is logged in
    //AuthenticationService.authenticationCheck().finally(function () {
    //
    //  $rootScope.$on('$stateChangeStart', function (event, next) {
    //
    //    // If no roles ares specified, default to all
    //    var authorizedRoles;
    //    if (typeof next.data === 'undefined' || typeof next.data.authorizedRoles === 'undefined') {
    //      authorizedRoles = USER_ROLES.all;
    //    }
    //    else {
    //      authorizedRoles = next.data.authorizedRoles;
    //    }
    //
    //    // Accès non autorisé
    //    if (!AuthenticationService.isAuthorized(authorizedRoles)) {
    //
    //      event.preventDefault();
    //
    //      // user is not allowed
    //      if (AuthenticationService.isAuthenticated()) {
    //        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
    //        $log.debug('[runBlock] User is not allowed');
    //        toastr.error($filter('translate')('key.foodrecipes.run.your_are_not_allowed'));
    //      }
    //      // user is not logged in
    //      else {
    //        $log.debug('[runBlock] User is not logged in');
    //        toastr.error($filter('translate')('key.foodrecipes.run.your_are_not_logged_in'));
    //        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
    //      }
    //    }
    //  });
    //
    //  $log.debug('[runBlock] end');
    //
    //});
  }

})();
