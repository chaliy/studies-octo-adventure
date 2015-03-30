var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var react = require('gulp-react');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

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

gulp.task('start', function () {
  gulp
  .watch('lib/**/*.js', ['build', 'test']);
});
