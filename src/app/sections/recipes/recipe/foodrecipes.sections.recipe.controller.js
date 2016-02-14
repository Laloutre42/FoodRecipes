(function () {
  'use strict';

  angular.module('foodrecipes.sections.recipes.recipe.controller', [])
    .controller('RecipeController', ['$previousState', '$log', '$state', '$stateParams', 'RecipesService', 'SessionService', 'RecipeModalService', 'RECIPE_STATUS',
      function ($previousState, $log, $state, $stateParams, RecipesService, SessionService, RecipeModalService, RECIPE_STATUS) {

        const VIEW_MODE = 0;
        const EDIT_MODE = 1;
        const ADD_MODE = 2;

        var vm = this;
        vm.user = SessionService.getUser();
        vm.switchToViewMode = switchToViewMode;
        vm.switchToEditMode = switchToEditMode;
        vm.isViewMode = isViewMode;
        vm.isEditMode = isEditMode;
        vm.isAddMode = isAddMode;
        vm.save = save;
        vm.back = back;
        vm.cancel = cancel;
        vm.refresh = refresh;
        vm.addIngredient = addIngredient;
        vm.removeIngredient = removeIngredient;
        vm.isIngredientItemDirty = isIngredientItemDirty;
        vm.ingredientItemError = ingredientItemError;
        //vm.openModalForDelete = RecipeModalService.openModalForDelete; // todo back()

        vm.recipeId = $stateParams.recipeId || undefined;
        vm.recipe = undefined;

        // Load data
        refresh();

        function save() {

          if (typeof vm.user !== 'undefined') {

            vm.recipe.user = vm.user;

            if (isAddMode()) {
              vm.recipe.status = RECIPE_STATUS.ORIGINAL;
            }
            RecipesService.save(vm.recipe).$promise.then(function (data) {
              vm.recipeId = data.id;
              refresh();
            });
          }
        };

        function cancel() {

          if (isAddMode()) {
            //$previousState.go();
            $state.go('main.recipes');
          }
          if (isEditMode()) {
            refresh();
          }
        };

        function back() {
          $state.go('main.recipes');
        };

        function refresh() {

          // Add recipe
          if (typeof vm.recipeId === 'undefined' && typeof vm.recipe === 'undefined') {
            vm.recipe = new RecipesService({});
            vm.mode = ADD_MODE;
          }
          // Edit or view existing recipe
          else {
            RecipesService.get({id: vm.recipeId}).$promise.then(
              function (data) {
                vm.recipe = data;
                $log.debug("[RecipeController][RecipesService.get] Loading recipe with id ", vm.recipeId);
                switchToViewMode();
              },
              function (data) {
                $log.error("[RecipeController][RecipesService.get] Error retrieving data with id ", vm.recipeId);
              });
          }
        }

        function addIngredient() {
          if (typeof vm.recipe.ingredients === 'undefined') {
            vm.recipe.ingredients = [];
          }
          if (vm.recipe.ingredients.indexOf("") === -1) {
            vm.recipe.ingredients.push("");
          }
        }

        function removeIngredient(index) {
          if (typeof vm.recipe.ingredients !== 'undefined') {
            vm.recipe.ingredients.splice(index, 1)
          }
        }

        function isIngredientItemDirty(form, index) {
          return (typeof form !== 'undefined' && form["ingredient" + index].$dirty);
        }

        function ingredientItemError(form, index) {
          return (typeof form !== 'undefined' && form["ingredient" + index].$error);
        }

        function switchToViewMode() {
          vm.mode = VIEW_MODE;
        }

        function switchToEditMode() {
          vm.mode = EDIT_MODE;
        }

        function isViewMode() {
          return vm.mode === VIEW_MODE;
        }

        function isEditMode() {
          return vm.mode === EDIT_MODE;
        }

        function isAddMode() {
          return vm.mode === ADD_MODE;
        }

      }]);
})();
