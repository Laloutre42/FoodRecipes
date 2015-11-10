(function () {
  'use strict';

  angular.module('foodrecipes.sections.recipe.add.controller', ['foodrecipes.core.service.recipes'])
    .controller('AddRecipeController', function ($log, $stateParams, $previousState, RecipesService, SessionService) {

      var vm = this;
      vm.foodList = angular.copy($stateParams.foodList) || {};
      vm.user = SessionService.getUser();
      vm.ok = ok;
      vm.back = back;

      // Valid form
      function ok() {

        if (!vm.user){
          $log.error("[AddRecipeController] User is undefined!");
          return;
        }
        else{
          vm.foodList.user = vm.user;

          RecipesService.save(vm.foodList).$promise.then(
            function () {
              vm.back();
            });
        }

      }

      // Cancel form
      function back() {
        $previousState.go();
      }
    });
})();
