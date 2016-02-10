(function () {
  'use strict';

  angular.module('foodrecipes.sections.recipes.controller', [
    'foodrecipes.sections.recipes.recipe.controller',
    'foodrecipes.sections.recipes.modal.delete.controller'
  ])
    .controller('RecipesController', ['$rootScope', '$log', '$filter', '$stateParams', '$state', 'ngTableParams', 'RecipesService', 'SessionService', 'RecipeModalService',
      function ($rootScope, $log, $filter, $stateParams, $state, ngTableParams, RecipesService, SessionService, RecipeModalService) {

        var vm = this;
        vm.navigateToDetailrecipe = navigateToDetailRecipe;
        vm.user = SessionService.getUser();
        vm.openModalForDetails = RecipeModalService.openModalForDetails;
        vm.openModalForEdit = RecipeModalService.openModalForEdit;
        vm.openModalForDelete = RecipeModalService.openModalForDelete;

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
          $state.go('main.recipe', {recipeId: recipe.id});
        }

        function getAllRecipes($defer, params) {

          RecipesService.query().$promise.then(function (data) {
            $log.debug('[RecipesController][getAllRecipes] recipes data length is ', data.length);

            var orderedData = params.sorting() ? $filter('orderBy')(data, vm.recipesTable.orderBy()) : data;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            params.total(orderedData.length);
          });
        }

        /** Events **/

        // Reload data
        $rootScope.$on('reload', function (event){
          vm.recipesTable.reload();
        })

      }]);
})();
