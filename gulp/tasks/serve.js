'use strict';

var serveTask = function (gulp, plugins, config) {
  gulp.task('serve', function() {

    var reload = plugins.browserSync.reload;

    plugins.browserSync.init({
      server: './'
    });

    gulp.watch('*.php').on('change', reload); // PHP files in WP projects
    gulp.watch('templates/**/*.twig').on('change', reload); // Twig templates in WP projects
    gulp.watch(config.paths.src + '/styles/**/*', ['styles']);
    gulp.watch(config.paths.src + '/templates/**/*.{twig,html}', ['templates']);
  });
};

module.exports = serveTask;
