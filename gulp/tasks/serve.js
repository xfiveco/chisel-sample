'use strict';

var serveTask = function (gulp, plugins, config) {
  gulp.task('serve', function() {
    plugins.browserSync.init({
      server: './'
    });

    gulp.watch('*.php').on('change', plugins.browserSync.reload); // PHP files in WP projects
    gulp.watch(config.paths.src + '/templates/**/*.twig').on('change', plugins.browserSync.reload); // Twig templates in WP projects
    gulp.watch(config.paths.src + '/templates/**/*.{twig,html}', ['templates']); // Build templates in front-end project
    gulp.watch(config.paths.src + '/styles/**/*', ['styles']);
  });
};

module.exports = serveTask;
