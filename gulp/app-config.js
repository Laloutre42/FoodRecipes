(function () {

  'use strict';

  var path = require('path');
  var gulp = require('gulp');
  var conf = require('./conf');
  var gulpNgConfig = require('gulp-ng-config');
  var argv = require('yargs').argv;

  var environment = argv.env || 'dev';

  gulp.task('config-env', function () {
    gulp.src(path.join(conf.paths.src, '/config-env/foodrecipes.core.constant.env.json'))
      .pipe(gulpNgConfig('foodrecipes.core.constant.env', {
        environment: environment,
        wrap: '(function () { \n \'use strict\';\n\n <%= module %> \n })();'
      }))
      .pipe(gulp.dest(path.join(conf.paths.src, '/app/core/constant')))
  });

})();
