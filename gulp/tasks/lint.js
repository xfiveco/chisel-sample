'use strict';

var lintTask = function (gulp, plugins, config) {
  gulp.task('lint', function() {
    var src = config.paths.src + '/scripts/';

    return gulp.src([src + '**/*.js','!node_modules/**'])
      
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failAfterError());
  });
};

module.exports = lintTask;
