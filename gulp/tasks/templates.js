'use strict';

var fs = require('fs');

var templatesTask = function (gulp, plugins, config, helpers) {

   var src = config.paths.src + '/templates/*.twig';
  var dest = config.paths.dest;

  gulp.task('templates-watch', function() {

    return gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.twigUpToDate({ 
        functions: [
          {
            name: "assetPath",
            func: function (path) {
              return path;
            }
          }
        ],
        errorLogToConsole: true 
      }))
      .pipe(plugins.prettify({ indent_size: 2, preserve_newlines: true }))
      .pipe(gulp.dest(dest))
      .on('end', plugins.browserSync.reload);
  });

  gulp.task('templates-build', ['styles-build'], function() {
    var manifest = JSON.parse(fs.readFileSync(config.paths.dest + '/rev-manifest.json', 'utf8'));

    return gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.twigUpToDate({ 
        functions: [
          {
            name: "assetPath",
            func: function (path) {
              return manifest[path];
            }
          }
        ],
        errorLogToConsole: true 
      }))
      .pipe(plugins.prettify({ indent_size: 2, preserve_newlines: true }))
      .pipe(gulp.dest(dest))
      .on('end', plugins.browserSync.reload);
  });
};

module.exports = templatesTask;
