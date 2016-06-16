'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ pattern: '*' });
var config  = require('./package.json').chisel;

/**
 * Batch tasks loader
 */
plugins.glob.sync('gulp/tasks/*').forEach(function (path) {
  path = path.replace('gulp/', './gulp/');
  require(path)(gulp, plugins, config);
});

gulp.task('default', ['serve']);
