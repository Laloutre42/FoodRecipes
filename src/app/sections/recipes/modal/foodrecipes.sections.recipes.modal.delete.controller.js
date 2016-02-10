(function () {
  'use strict';


  angular.module('foodrecipes.sections.recipes.modal.delete.controller', [])
    .controller('RecipeModalDeleteController', ['$scope', '$uibModalInstance', 'RecipesService', 'recipe',
      function ($scope, $uibModalInstance, RecipeService, recipe) {

        $scope.recipe = recipe;

        $scope.delete = function () {
          $uibModalInstance.close();
          RecipeService.delete(recipe).$promise.then(function () {
              $scope.$emit('reload');
          });
        };

        $scope.close = function () {
          $uibModalInstance.close();
        };

      }]);
})();
