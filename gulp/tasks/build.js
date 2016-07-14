'use strict';

var buildTask = function (gulp, plugins, config) {
  gulp.task('build', function () {
    plugins.del([config.paths.dest]).then(function () {
      gulp.start([
        // 'styles-build',
        // 'scripts-build',
        'templates-build'
      ]);
    });
  });
};

module.exports = buildTask;
