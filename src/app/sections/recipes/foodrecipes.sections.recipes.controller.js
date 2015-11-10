(function () {
  'use strict';

  angular.module('foodrecipes.sections.recipes.controller', [])
    .controller('RecipesController', ['$log', '$filter', '$stateParams', '$state', 'ngTableParams', 'RecipesService', 'SessionService',
        function ($log, $filter, $stateParams, $state, ngTableParams, RecipesService, SessionService) {

      var vm = this;
      vm.addFoodList = addFoodList;
      vm.navigateToDetailFoodList = navigateToDetailFoodList;
      vm.removeFoodList = removeFoodList;
      vm.user = SessionService.getUser();

      // ng table to display data
      vm.recipeslistTable = new ngTableParams({
        page: 1,
        count: 10
      }, {
        total: 0,
        getData: function ($defer, params) {
          getAllRecipes($defer, params);
        }
      });

      // Open a modal to add a new food list
      function addFoodList(foodList) {
        $state.go('main.modal', {foodList: foodList});
      }

      // Navigate to the foodlist detail (item list)
      function navigateToDetailFoodList(foodList) {
        $state.go('main.itemslist', {foodListId: foodList.id});
      }

      function removeFoodList(foodList) {
        FoodListService.delete({'id': foodList.id}).$promise.then(function () {
          vm.foodlistTable.reload();
        });
      }

      function getAllFoodList($defer, params) {

        var getFoodListParam;
        if ($stateParams.type === 'all') {
          getFoodListParam = FoodListService.query();
        }
        else {
          // Todo to change userId
          getFoodListParam = FoodListService.getFoodListByUserId({'userId': vm.user.id});
        }

        getFoodListParam.$promise.then(function (data) {
          $log.debug('[getAllFoodList] length is ', data.length);

          var orderedData = params.sorting() ? $filter('orderBy')(data, vm.foodlistTable.orderBy()) : data;
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          params.total(orderedData.length);
        });
      }

    }]);
})();
