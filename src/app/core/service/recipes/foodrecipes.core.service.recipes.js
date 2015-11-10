(function() {
  'use strict';

angular.module('foodrecipes.core.service.recipes', [])
  .factory('RecipesService', ['$resource', 'ENV', function ($resource, ENV) {
    return $resource(ENV.apiEndpoint + '/recipes/:id', {id: '@id'}, {

    }, {
      stripTrailingSlashes: false
    });
  }]);
})();
