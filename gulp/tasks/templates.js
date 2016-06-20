'use strict';

var templatesTask = function (gulp, plugins, config, helpers) {
  gulp.task('templates', function() {
    var src = config.paths.src + '/templates/*.twig';
    var dest = config.paths.dest;

    return gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.twigUpToDate({ errorLogToConsole: true }))
      .pipe(plugins.prettify({ indent_size: 2, preserve_newlines: true }))
      .pipe(gulp.dest(dest))
      .on('end', plugins.browserSync.reload);
  });
};

module.exports = templatesTask;
