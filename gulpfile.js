var extend = require('extend'),
    gulp = require('gulp'),
    gulpHelper = require('./gulp-helper'),
    gulpLiveServer = require('gulp-live-server'),
    gulpTypescript = require('gulp-typescript'),
    gulpWatch = require('gulp-watch'),
    typescript = require('typescript'),
    typescriptConfig = require('./tsconfig.json');

var server = gulpLiveServer('./index.js', {
  cwd: './build',
  env: {
    NODE_ENV: 'development'
  }
});

gulp.task('typescript', function () {
  return gulp.src(typescriptConfig.filesGlob)
    .pipe(gulpTypescript(extend({typescript: typescript}, typescriptConfig.compilerOptions)))
    .pipe(gulp.dest('./build'))
    .pipe(gulpHelper.triggerRestart(server));
});

gulp.task('public', function () {
  return gulp.src('./public/**/*')
    .pipe(gulp.dest('./build/public'))
    .pipe(gulpHelper.triggerRestart(server));
});

gulp.task('server', ['build'], function (cb) {
  server.start();
});

gulp.task('watch', ['build'], function (cb) {
  gulpWatch('./src/**/*.ts', function () {
    gulp.start('typescript');
  });

  gulpWatch('./public/**/*', function () {
    gulp.start('public');
  });
});

gulp.task('build', ['typescript', 'public']);
gulp.task('default', ['server', 'watch']);
