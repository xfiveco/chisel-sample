'use strict';

var serveTask = function (gulp, plugins, config) {
  gulp.task('serve', function() {
    plugins.browserSync.init({
      server: './'
    });

    gulp.watch(config.paths.src + '/styles/**/*', ['styles', 'templates']);
    gulp.watch('*.php').on('change', plugins.browserSync.reload); // PHP files in WP projects
    gulp.watch(config.paths.src + '/templates/**/*.twig').on('change', plugins.browserSync.reload); // Twig templates in WP projects
    gulp.watch(config.paths.src + '/templates/**/*.{twig,html}', ['templates']); // Build templates in front-end project
  });
};

module.exports = serveTask;
