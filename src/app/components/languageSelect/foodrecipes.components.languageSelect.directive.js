(function () {
  'use strict';

  angular.module('foodrecipes.components.languageSelect.directive', [])
    .directive('languageSelectDirective', ['$log', 'LocaleService', function ($log, LocaleService) {

      var directive = {
        restrict: 'A',
        replace: true,
        templateUrl: 'app/components/languageSelect/languageSelect.html',
        controller: [LanguageSelectController],
        controllerAs: 'vmL',
        bindToController: true
      };

      return directive;

      function LanguageSelectController() {
        var vmL = this;

        vmL.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();

        $log.debug('[LanguageSelectController] Current locale is ', vmL.currentLocaleDisplayName );

        vmL.localesDisplayNames = LocaleService.getLocalesDisplayNames();
        vmL.visible = vmL.localesDisplayNames && vmL.localesDisplayNames.length > 1;

        vmL.changeLanguage = function (locale) {
          LocaleService.setLocaleByDisplayName(locale);
        };

      }

    }]);

})();

