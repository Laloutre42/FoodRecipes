(function() {
  'use strict';


angular.module('foodrecipes.sections.recipes.modal.controller', [])
  .controller('RecipeDetailController', function ($scope, $filter, $modalInstance, $log, ngTableParams, recipe) {

    $scope.recipe = recipe;

    // Cancel modal
    $scope.close = function () {
      $modalInstance.close();
    };

  });
})();
