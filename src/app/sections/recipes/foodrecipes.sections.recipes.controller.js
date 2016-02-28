(function () {
  'use strict';

  angular.module('foodrecipes.sections.recipes.controller', [
    'foodrecipes.sections.recipes.recipe.controller',
    'foodrecipes.sections.recipes.modal.delete.controller',
    'foodrecipes.sections.recipes.modal.addToMyRecipe.controller'
  ])
    .controller('RecipesController',
    ['$rootScope', '$log', '$filter', '$stateParams', '$state', 'ngTableParams', 'RecipesService', 'SessionService', 'RecipeModalService', 'LIST_MODE', 'RECIPE_STATUS',
      function ($rootScope, $log, $filter, $stateParams, $state, ngTableParams, RecipesService, SessionService, RecipeModalService, LIST_MODE, RECIPE_STATUS) {

        var vm = this;
        vm.navigateToDetailrecipe = navigateToDetailRecipe;
        vm.user = SessionService.getUser();
        vm.openModalForAddToMyRecipe = RecipeModalService.openModalForAddToMyRecipe;
        vm.openModalForDelete = RecipeModalService.openModalForDelete;

        vm.switchToMyListMode = switchToMyListMode;
        vm.switchToAllListMode = switchToAllListMode;
        vm.isMyListMode = isMyListMode;
        vm.isAllListMode = isAllListMode;

        //$log.debug('$stateParams.type', $stateParams.type === LIST_MODE.MY_LIST_MODE);
        vm.mode = (typeof $stateParams.type !== 'undefined' && $stateParams.type === LIST_MODE.MY_LIST_MODE) ? LIST_MODE.MY_LIST_MODE : LIST_MODE.All_LIST_MODE;

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

          var getAllRecipesParam;
          if (isAllListMode()) {
            //getAllRecipesParam = RecipesService.query();
            getAllRecipesParam = RecipesService.getRecipesByStatus({'status': RECIPE_STATUS.ORIGINAL});

          }
          if (isMyListMode() && vm.user && vm.user.id !== '') {
            getAllRecipesParam = RecipesService.getRecipesByUserId({'userId': vm.user.id});
          }

          if (typeof getAllRecipesParam !== 'undefined') {

            getAllRecipesParam.$promise.then(function (data) {
              $log.debug('[RecipesController][getAllRecipes] recipes data length is ', data.length);

              var orderedData = params.sorting() ? $filter('orderBy')(data, vm.recipesTable.orderBy()) : data;
              $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
              params.total(orderedData.length);
            });
          }
        }

        /** Mode **/
        function switchToMyListMode() {
          vm.mode = LIST_MODE.MY_LIST_MODE;
        }

        function switchToAllListMode() {
          vm.mode = LIST_MODE.All_LIST_MODE;
        }

        function isMyListMode() {
          return vm.mode === LIST_MODE.MY_LIST_MODE;
        }

        function isAllListMode() {
          return vm.mode === LIST_MODE.All_LIST_MODE;
        }

        /** Events **/

          // Reload data
        $rootScope.$on('reload', function (event) {
          vm.recipesTable.reload();
        })

      }]);
})();
