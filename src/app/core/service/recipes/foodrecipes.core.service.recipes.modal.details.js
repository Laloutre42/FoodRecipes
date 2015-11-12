(function () {
  'use strict';

  angular.module('foodrecipes.core.service.recipes.modal.details', [])
    .service('RecipeDetailsService', function ($modal) {

      var RecipeDetailsService = {
        openModalForDetails: openModalForDetails
      };

      function openModalForDetails(recipe) {

        $modal.open({
          animation: true,
          templateUrl: 'app/sections/recipes/modal/recipes.detail.html',
          controller: 'RecipeDetailController',
          size: 'lg',
          resolve: {
            product: function () {
              return recipe;
            }
          }
        });
      }

      return RecipeDetailsService;
    });
})();
