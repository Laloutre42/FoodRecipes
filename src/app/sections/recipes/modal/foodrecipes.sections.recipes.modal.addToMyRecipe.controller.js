(function () {
  'use strict';


  angular.module('foodrecipes.sections.recipes.modal.addToMyRecipe.controller', [])
    .controller('RecipeModalAddToMyRecipeController', ['$scope', '$uibModalInstance', 'RecipesService', 'SessionService', 'recipe', 'RECIPE_STATUS',
      function ($scope, $uibModalInstance, RecipesService, SessionService, recipe, RECIPE_STATUS) {

        $scope.recipe = recipe;

        $scope.addToMyRecipe = function () {

          if (typeof SessionService.user !== 'undefined') {

            $uibModalInstance.close();

            var newRecipe = {};
            angular.copy(recipe, newRecipe);
            delete newRecipe.id;

            newRecipe.user = SessionService.getUser();
            newRecipe.status = RECIPE_STATUS.DUPLICATED;

            RecipesService.save(newRecipe).$promise.then(function () {
              $scope.$emit('reload');
            });
          }
        };

        $scope.close = function () {
          $uibModalInstance.close();
        };

      }]);
})();
