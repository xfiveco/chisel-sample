'use strict';

var assetsTask = function (gulp, plugins, config, helpers) {
  gulp.task('assets', ['clean'], function () {
    var src = [config.paths.src + '/assets/**/*', '!**/.keep'];
    var dest = config.paths.dest;

    var stream = gulp.src(src, { base: config.paths.src })
      .pipe(plugins.newer(dest))
      .pipe(gulp.dest(dest))
      .on('end', plugins.browserSync.reload);

    return stream;
  });
};

module.exports = assetsTask;
