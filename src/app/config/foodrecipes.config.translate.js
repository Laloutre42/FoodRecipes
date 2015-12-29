(function () {
  'use strict';

  angular.module('foodrecipes.config.translate', [])
    .config(['$translateProvider', 'tmhDynamicLocaleProvider', 'LOCALES',
      function ($translateProvider, tmhDynamicLocaleProvider, LOCALES) {

        // Get warnings in the developer console, regarding forgotten IDs in translations,
        $translateProvider.useMissingTranslationHandlerLog();

        $translateProvider.useStaticFilesLoader({
          prefix: 'locale/locale-',
          suffix: '.json'
        });
        $translateProvider.preferredLanguage(LOCALES.preferredLocale);// is applied on first load
        $translateProvider.useLocalStorage();// saves selected language to localStorage
        tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');

        // sanitize: sanitizes HTML in the translation text using $sanitize
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

      }]);

})();
