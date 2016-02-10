(function() {
  'use strict';

angular.module('foodrecipes', [
  // Ng
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ngMessages',

  //ngTable
  'ngTable',

  // Ui
  'ui.bootstrap',
  'ui.router',

  // Ui router extra
  'ct.ui.router.extras.core',
  'ct.ui.router.extras.transition',
  'ct.ui.router.extras.previous',

  // translate
  'pascalprecht.translate',
  'tmh.dynamicLocale',

  // My app
  'foodrecipes.sections',
  'foodrecipes.components',
  'foodrecipes.core',
  'foodrecipes.route',
  'foodrecipes.config'
]);
})();
