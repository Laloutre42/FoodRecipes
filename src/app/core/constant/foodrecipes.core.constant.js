(function () {
  'use strict';

  /* global malarkey:false, toastr:false, moment:false */
  angular.module('foodrecipes.core.constant', [])

    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)

    .constant('LOCALES', {
      'locales': {
        'ru_RU': 'Русский',
        'fr_FR': 'Français',
        'en_US': 'English'
      },
      'preferredLocale': 'en_US'
    })

    .constant('CONST', {
      itemCategories: ['Breakfast', 'Snack', 'Lunch', 'Diner'],
      catalog: {
        CIQUAL_2012: 'Ciqual 2012',
        CUSTOM: 'Custom'
      }
    })

    .constant('AUTH_EVENTS', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    })

    .constant('USER_ROLES', {
      all: '*',
      admin: 'ADMIN',
      user: 'USER',
      guest: 'GUEST'
    });

})();
