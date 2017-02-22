var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  controller:['www/**/controller/*.js'],
  directive:['www/**/directive/*.js'],
  model:['www/**/model/*.js'],
  service:['www/**/service/*.js'],
  app:['www/app.js','www/**/main.js','www/core/lib/*.js'],
  watch:['www/**/*.js','!www/lib/*.js']
};



gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});
gulp.task('controller',function (done) {
  gulp.src(paths.controller)
    .pipe(concat('controller.js'))
    .pipe(gulp.dest('www/lib'))
    .on('end',done);
});
gulp.task('service',function (done) {
  gulp.src(paths.service)
    .pipe(concat('service.js'))
    .pipe(gulp.dest('www/lib'))
    .on('end',done);
});
gulp.task('directive',function (done) {
  gulp.src(paths.directive)
    .pipe(concat('directive.js'))
    .pipe(gulp.dest('www/lib'))
    .on('end',done);
});
gulp.task('app',function (done) {
  gulp.src(paths.app)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('www/lib'))
    .on('end',done);
});
gulp.task('model',function (done) {
  gulp.src(paths.model)
    .pipe(concat('model.js'))
    .pipe(gulp.dest('www/lib'))
    .on('end',done);
});
// gulp.task('default', ['sass']);
gulp.task('default', function () {
  gulp.run(['directive','controller','model','service','app','sass']);
});

gulp.task('watch', function() {

  gulp.run(['default']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.controller, ['controller']);
  gulp.watch(paths.service, ['service']);
  gulp.watch(paths.model, ['model']);
  gulp.watch(paths.app, ['app']);
  gulp.watch(paths.directive, ['directive'])
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
