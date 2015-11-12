(function () {
  'use strict';

  angular.module('foodrecipes.core.service', [
    'foodrecipes.core.service.recipes',
    'foodrecipes.core.service.recipes.modal.details',
    'foodrecipes.core.service.previousState',
    'foodrecipes.core.service.authentication',
    'foodrecipes.core.service.authenticationInterceptor',
    'foodrecipes.core.service.session',
    'foodrecipes.core.service.locale'
  ]);
})();
