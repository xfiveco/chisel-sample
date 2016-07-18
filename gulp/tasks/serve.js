'use strict';

var serveTask = function (gulp, plugins, config) {
  gulp.task('serve', ['styles-watch', 'templates-watch'], function() {
    plugins.browserSync.init({
      server: './'
    });

    gulp.watch(config.paths.src + '/styles/**/*', ['styles-watch']);
    gulp.watch('*.php').on('change', plugins.browserSync.reload); // PHP files in WP projects
    gulp.watch(config.paths.src + '/templates/**/*.{twig,html}', ['templates-watch']); // Build templates in front-end project
  });
};

module.exports = serveTask;
