'use strict';

var scriptsTask = function (gulp, plugins, config, helpers) {

  var src = config.paths.src + '/scripts/';
  var dest = config.paths.dest + '/scripts';

  var customOpts = {
    entries: src + 'app.js',
    debug: true
  };

  function bundle(bundler) {
    return bundler
      .bundle()
      .pipe(plugins.vinylSourceStream('bundle.js'))
      .pipe(plugins.vinylBuffer())
      .pipe(plugins.sourcemaps.init({loadMaps: true}))
      .pipe(plugins.uglify())
      .on('error', helpers.onError)
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(dest))
      .pipe(plugins.browserSync.stream());
  }
  
  gulp.task('scripts-build', ['styles-build', 'lint'], function () {
    return bundle(plugins.browserify(customOpts))
      .pipe(plugins.rev())
      .pipe(gulp.dest(dest))
      .pipe(plugins.rev.manifest({
        path: config.paths.dest + '/rev-manifest.json',
        base: config.paths.dest,
        merge: true 
      }))
      .pipe(gulp.dest(config.paths.dest));
  });

  gulp.task('watchify', function () {
    var watcher = plugins.watchify(plugins.browserify(customOpts, plugins.watchify.args));
    bundle(watcher);
    watcher.on('update', function () {
      bundle(watcher);
    })
  });
};

module.exports = scriptsTask;
