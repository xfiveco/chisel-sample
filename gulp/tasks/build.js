'use strict';

var buildTask = function (gulp, plugins, config) {

  gulp.task('clean', function() {
    return plugins.del([config.paths.dest]);
  });

  gulp.task('build', ['templates-build']);
};

module.exports = buildTask;
