(function () {
  'use strict';

  angular.module('foodrecipes.core.service.recipes', [])
    .factory('RecipesService', ['$resource', 'ENV', function ($resource, ENV) {
      return $resource(ENV.serverName + '/api/recipes/:id', {id: '@id'}, {

        // Get recipes by an author id
        getRecipesByUserId: {
          url: ENV.serverName + '/api/recipes/userId/:userId',
          method: 'GET',
          isArray: true
        },

        // Get recipes by status
        getRecipesByStatus: {
          url: ENV.serverName + '/api/recipes/status/:status',
          method: 'GET',
          isArray: true
        }

      }, {
        stripTrailingSlashes: false
      });
    }]);
})();
