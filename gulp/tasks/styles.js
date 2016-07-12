'use strict';

var stylesTask = function (gulp, plugins, config, helpers) {
  gulp.task('styles', function() {
    var src = config.paths.src + '/styles/*.scss';
    var dest = config.paths.dest + '/styles';

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
      .pipe(gulp.dest(dest))
      .pipe(plugins.browserSync.stream());
  });
};

module.exports = stylesTask;
