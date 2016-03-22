var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src(['src/*.scss','src/*.sass'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dest/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});