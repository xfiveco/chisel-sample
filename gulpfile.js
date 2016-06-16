'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ pattern: '*' });

var src = {
  styles: 'src/styles/**/*',
  styles_main: 'src/styles/*.scss',
  templates: 'src/templates/*.twig',
  php: '*.php'
};

var dist = {
   css: 'dist/css',
   templates: 'dist'
}

// Browsersync
gulp.task('serve', function() {
  plugins.browserSync.init({
    server: './'
  });

  gulp.watch(src.php).on('change', plugins.browserSync.reload);
  gulp.watch(src.twig).on('change', plugins.browserSync.reload);
  gulp.watch(src.styles, ['sass']);
  gulp.watch(src.templates, ['templates']);
});

// Styles
gulp.task('sass', function() {
  return gulp.src(src.styles_main)
    .pipe(plugins.cssGlobbing({ extensions: ['.scss', '.css'] }))
    .pipe(plugins.sass())
    .pipe(gulp.dest(dist.css))
    .pipe(plugins.browserSync.stream());
});

// Templates
gulp.task('templates', function() {
  return gulp.src(src.templates)
    .pipe(plugins.twigUpToDate({ errorLogToConsole: true }))
    .pipe(gulp.dest(dist.templates))
    .on('end', plugins.browserSync.reload);
});

gulp.task('default', ['serve']);
