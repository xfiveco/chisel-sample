'use strict';

var fs = require('fs');

var templatesTask = function (gulp, plugins, config, helpers) {

  var src = config.paths.src + '/templates/*.twig';
  var dest = config.paths.dest;

  function templates(manifest) {
    return gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.twigUpToDate({ 
        functions: [
          {
            name: "assetPath",
            func: function (path) {
              if (manifest) {
                return manifest[path];
              } else {
                return path;
              }
            }
          }
        ],
        errorLogToConsole: true 
      }))
      .pipe(plugins.prettify({ indent_size: 2, preserve_newlines: true }))
      .pipe(gulp.dest(dest))
      .on('end', plugins.browserSync.reload);
  }

  gulp.task('templates-watch', function() {
    templates();
  });

  gulp.task('templates-build', ['scripts-build'], function() {
    var manifest = JSON.parse(fs.readFileSync(config.paths.dest + '/rev-manifest.json', 'utf8'));
    templates(manifest);
  });
};

module.exports = templatesTask;
