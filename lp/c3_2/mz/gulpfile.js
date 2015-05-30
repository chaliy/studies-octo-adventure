var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('default', ['build', 'test']);

gulp.task('build', function () {
});

gulp.task('test', function () {
  return gulp.src('specs/**/*-spec.js')
      .pipe(jasmine());
});

gulp.task('dev', function () {
  gulp
  .watch(['lib/**/*.js', 'specs/**/*.js'], ['build', 'test']);
});
