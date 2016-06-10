'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');
var twig = require('gulp-twig-up-to-date');

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
  browserSync.init({
    server: './'
  });

  gulp.watch(src.php).on('change', reload);
  gulp.watch(src.twig).on('change', reload);
  gulp.watch(src.styles, ['sass']);
  gulp.watch(src.templates, ['templates']);
});

// Styles
gulp.task('sass', function() {
  return gulp.src(src.styles_main)
    .pipe(cssGlobbing({ extensions: ['.scss', '.css'] }))
    .pipe(sass())
    .pipe(gulp.dest(dist.css))
    .pipe(browserSync.stream());
});

// Templates
gulp.task('templates', function() {
  return gulp.src(src.templates)
    .pipe(twig({ errorLogToConsole: true }))
    .pipe(gulp.dest(dist.templates))
    .on('end', browserSync.reload);
});

gulp.task('default', ['serve']);
