(function () {
  'use strict';

  angular.module('foodrecipes.core.service.recipes.modal', [])
    .service('RecipeModalService', function ($uibModal) {

      var RecipeModalService = {
        openModalForDelete: openModalForDelete
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

      return RecipeModalService;
    });
})();
