(function () {
  'use strict';

  angular.module('foodrecipes.core.service.recipes.modal.details', [])
    .service('RecipeDetailsService', function ($uibModal) {

      var RecipeDetailsService = {
        openModalForDetails: openModalForDetails
      };

      function openModalForDetails(recipe) {

        $uibModal.open({
          animation: true,
          templateUrl: 'app/sections/recipes/modal/recipes.detail.html',
          controller: 'RecipeDetailController',
          size: 'lg',
          resolve: {
            recipe: function () {
              return recipe;
            }
          }
        });
      }

      return RecipeDetailsService;
    });
})();
