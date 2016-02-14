(function () {
  'use strict';

  angular.module('foodrecipes.core.service.recipes.modal', [])
    .service('RecipeModalService', function ($uibModal) {

      var RecipeModalService = {
        openModalForDelete: openModalForDelete,
        openModalForAddToMyRecipe: openModalForAddToMyRecipe
      };

      function openModalForDelete(recipe) {

        $uibModal.open({
          animation: true,
          templateUrl: 'app/sections/recipes/modal/recipes.delete.html',
          controller: 'RecipeModalDeleteController',
          size: 'lg',
          resolve: {
            recipe: function () {
              return recipe;
            }
          }
        });
      }

      function openModalForAddToMyRecipe(recipe) {

        $uibModal.open({
          animation: true,
          templateUrl: 'app/sections/recipes/modal/recipes.addToMyRecipe.html',
          controller: 'RecipeModalAddToMyRecipeController',
          size: 'lg',
          resolve: {
            recipe: function () {
              return recipe;
            }
          }
        });
      }

      return RecipeModalService;
    });
})();
