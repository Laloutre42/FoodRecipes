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

  //Char with highcharts-ng build with highcharts for angular
  'highcharts-ng',

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
