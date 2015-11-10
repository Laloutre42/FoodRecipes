(function () {
  'use strict';

  angular.module('foodrecipes.sections.recipes.controller', [])
    .controller('RecipesController', ['$log', '$filter', '$stateParams', '$state', 'ngTableParams', 'RecipesService', 'SessionService',
        function ($log, $filter, $stateParams, $state, ngTableParams, RecipesService, SessionService) {

      var vm = this;
      vm.addRecipe = addRecipe;
      vm.navigateToDetailRecipe = navigateToDetailRecipe;
      vm.removeRecipe = removeRecipe;
      vm.user = SessionService.getUser();

      // ng table to display data
      vm.recipesTable = new ngTableParams({
        page: 1,
        count: 10
      }, {
        total: 0,
        getData: function ($defer, params) {
          getAllRecipes($defer, params);
        }
      });

      // Open a modal to add a new recipe
      function addRecipe(recipe) {
        $state.go('main.addRecipe', {recipe: recipe});
      }

      // Navigate to the recipe detail
      function navigateToDetailRecipe(recipe) {
        $state.go('main.itemslist', {recipeId: recipe.id});
      }

      function removeRecipe(recipe) {
        RecipesService.delete({'id': recipe.id}).$promise.then(function () {
          vm.recipesTable.reload();
        });
      }

      function getAllRecipes($defer, params) {

        RecipesService.query().$promise.then(function (data) {
          $log.debug('[getAllRecipes] length is ', data.length);

          var orderedData = params.sorting() ? $filter('orderBy')(data, vm.recipesTable.orderBy()) : data;
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          params.total(orderedData.length);
        });
      }

    }]);
})();
