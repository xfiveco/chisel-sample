'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');

var src = {
  styles: 'src/styles/**/*',
  styles_main: 'src/styles/*.scss',
  twig: 'src/templates/*.twig',
  php: '*.php'
};

var dist = {
   css: 'dist/css'
}

// Browsersync
gulp.task('serve', function() {
  browserSync.init({
    server: './'
  });

  gulp.watch(src.php).on('change', reload);
  gulp.watch(src.twig).on('change', reload);
  gulp.watch(src.styles, ['sass']);
});

// Styles
gulp.task('sass', function() {
  return gulp.src(src.styles_main)
    .pipe(cssGlobbing({ extensions: ['.scss', '.css'] }))
    .pipe(sass())
    .pipe(gulp.dest(dist.css))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
