(function () {
  'use strict';

  angular.module('foodrecipes.sections.recipes.controller', ['foodrecipes.sections.recipes.modal.controller'])
    .controller('RecipesController', ['$log', '$filter', '$stateParams', '$state', 'ngTableParams', 'RecipesService', 'SessionService', 'RecipeDetailsService',
      function ($log, $filter, $stateParams, $state, ngTableParams, RecipesService, SessionService, RecipeDetailsService) {

        var vm = this;
        vm.navigateToDetailRecipe = navigateToDetailRecipe;
        vm.user = SessionService.getUser();
        vm.openModalForDetails = RecipeDetailsService.openModalForDetails;

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

        // Navigate to the recipe detail
        function navigateToDetailRecipe(recipe) {
          $state.go('main.itemslist', {recipeId: recipe.id});
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
