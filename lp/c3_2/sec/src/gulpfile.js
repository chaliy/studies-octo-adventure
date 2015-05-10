var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var react = require('gulp-react');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var traceur = require('gulp-traceur');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var es6ify = require('es6ify');

gulp.task('default', ['build', 'test']);

gulp.task('build', function () {
  gulp.src('lib/**/*.js')
          .pipe(plumber())
          .pipe(react())
          .pipe(traceur())
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
  livereload.listen();
  gulp
  .watch('lib/**/*.js', ['site-jsx']);
});

gulp.task('site-build', ['site-jsx', 'site-js', 'site-css', 'site-assets']);

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
  'react-bootstrap',
  'react-router-bootstrap'  
];

gulp.task('site-css', function () {
  return gulp
        .src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(concat('fx.css'))
        .pipe(gulp.dest('./site/stylesheets/'));

});

gulp.task('site-assets', function () {
});

gulp.task('site-jsx', function () {

  return browserify('./lib/site.js')
    .external(vendorLibs)
    .transform(reactify)
    .transform(es6ify)
    .bundle()
    .on('error', report)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./site/javascripts/'))
    .pipe(livereload());

});

gulp.task('site-js', function () {

  return browserify(es6ify.runtime, {
      require: vendorLibs,
      expose: vendorLibs
    })
    .bundle()
    .on('error', report)
    .pipe(source('fx.js'))
    .pipe(gulp.dest('./site/javascripts/'));
});
