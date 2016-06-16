'use strict';

var templatesTask = function (gulp, plugins, config) {
  gulp.task('templates', function() {
    var src = config.paths.src + '/templates/*.twig';
    var dest = config.paths.dest;

    return gulp.src(src)
      .pipe(plugins.twigUpToDate({ errorLogToConsole: true }))
      .pipe(gulp.dest(dest))
      .on('end', plugins.browserSync.reload);
  });
};

module.exports = templatesTask;
