var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var react = require('gulp-react');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');

gulp.task('default', ['build', 'test']);

gulp.task('build', function () {
  gulp.src('lib/**/*.js')
          .pipe(plumber())
          .pipe(react())
          .pipe(gulp.dest('js'));
});

gulp.task('test', function () {
  return gulp.src('spec/**/*-spec.js')
      .pipe(jasmine());
});

gulp.task('dev', function () {
  gulp
  .watch('lib/**/*.js', ['build', 'test']);
});

// Site

gulp.task('site-dev', function () {
  gulp
  .watch('lib/**/*.js', ['site-jsx']);
});

gulp.task('site-build', ['site-jsx', 'site-js', 'site-css']);

var report = function(err){
  gutil.log(
        gutil.colors.red('Browserify compile error:'),
        err.message
    );
    this.emit('end');
};

var vendorLibs = [
  'es6-shim',
  'react',
  'react-router',
  'react-bootstrap'
];

gulp.task('site-css', function () {
  return gulp
        .src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(concat('fx.css'))
        .pipe(gulp.dest('./site/stylesheets/'));

});

gulp.task('site-jsx', function () {

  return browserify('./lib/site.js')
    .external(vendorLibs)
    .transform(reactify)
    .bundle()
    .on('error', report)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./site/javascripts/'));

});

gulp.task('site-js', function () {

  return browserify({
      require: vendorLibs,
      expose: vendorLibs
    })
    .bundle()
    .on('error', report)
    .pipe(source('fx.js'))
    .pipe(gulp.dest('./site/javascripts/'));
});
