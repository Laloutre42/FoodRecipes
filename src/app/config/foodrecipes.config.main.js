(function () {
  'use strict';

  angular.module('foodrecipes.config.main', [])
    .config(['$logProvider', '$httpProvider', 'toastr', 'ENV',
      function ($logProvider, $httpProvider, toastr, ENV) {

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

      }]);

})();
