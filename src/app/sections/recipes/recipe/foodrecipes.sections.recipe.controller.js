(function () {
  'use strict';

  angular.module('foodrecipes.sections.recipes.recipe.controller', [])
    .controller('RecipeController', ['$previousState', '$log', '$state', '$stateParams', 'RecipesService',
      function ($previousState, $log, $state, $stateParams, RecipesService) {

        const VIEW_MODE = 0;
        const EDIT_MODE = 1;

        var vm = this;
        vm.switchToViewMode = switchToViewMode;
        vm.switchToEditMode = switchToEditMode;
        vm.isViewMode = isViewMode;
        vm.isEditMode = isEditMode;
        vm.save = save;
        vm.back = back;
        vm.cancel = cancel;
        vm.refresh = refresh;

        vm.recipeId = $stateParams.recipeId || undefined;
        vm.recipe = undefined;

        // Load data
        refresh();

        function save() {
          RecipesService.save(vm.recipe).$promise.then(function () {
            refresh();
          });
        };

        function cancel() {
          refresh();
          //$previousState.go();
          //$state.go('main.recipes');
        };

        function back() {
          $state.go('main.recipes');
        };

        function refresh(){
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


      }]);
})();
