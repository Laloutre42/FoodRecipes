(function () {
  'use strict';

  angular.module('foodrecipes.config.main', [])
    .config(['$logProvider', '$httpProvider', '$sceDelegateProvider', 'toastr', 'ENV',
      function ($logProvider, $httpProvider, $sceDelegateProvider, toastr, ENV) {

        // Enable log
        $logProvider.debugEnabled(ENV.isDebugEnabled);

        // Set options third-party lib
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = false;

        $httpProvider.interceptors.push([
          '$injector',
          function ($injector) {
            return $injector.get('AuthenticationInterceptorService');
          }
        ]);

        //$sceProvider.enabled(false);

        $sceDelegateProvider.resourceUrlWhitelist([
          // Allow same origin resource loads.
          'self',
          // Allow loading from our assets domain.  Notice the difference between * and **.
          ENV.serverName + '/**'
        ]);

      }]);

})();
