var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var exec = require('gulp-exec');
var sequence = require('run-sequence');

gulp.task('dev', () => {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ignore: ['test/*', 'integration/*', 'client/*'],
    ext: 'js handlebars',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('publish:staging', () => {
  return gulp.src('./package.json')
    .pipe(exec('eb deploy dev'))
    .pipe(exec.reporter());
});