'use strict';

var stylesTask = function (gulp, plugins, config, helpers) {

  var src = config.paths.src + '/styles/*.scss';
  var dest = config.paths.dest + '/styles';

  gulp.task('styles-watch', function() {
    return gulp.src(src)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.cssGlobbing({ extensions: ['.scss', '.css'] }))
      .pipe(plugins.sass({ outputStyle: 'expanded', includePaths: ['node_modules'] }))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(dest))
      .pipe(plugins.browserSync.stream({ match: '**/*.css' }));
  });

  gulp.task('styles-build', ['assets'], function() {

    var postcssPlugins = [
      require('autoprefixer')()
    ];

    return gulp.src(src)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.cssGlobbing({ extensions: ['.scss', '.css'] }))
      .pipe(plugins.sass({ outputStyle: 'expanded', includePaths: ['node_modules'] }))
      .pipe(plugins.postcss(postcssPlugins))
      .pipe(plugins.cleanCss())
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(plugins.rev())
      .pipe(gulp.dest(dest))
      .pipe(plugins.rev.manifest())
      .pipe(gulp.dest(config.paths.dest))
      .pipe(plugins.browserSync.stream());
  });
};

module.exports = stylesTask;
