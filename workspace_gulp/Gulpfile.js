// 获取 gulp
var gulp = require('gulp');

// 编译sass模块
var sass = require('gulp-sass');

// 监控文件变化模块
var watch = require('gulp-watch');

// 合并文件模块
var concat = require('gulp-concat');

// 压缩css模块
var minifyCss = require('gulp-minify-css');

// 编译jade模块
var jade = require('gulp-jade');

// 编译es6模块
var babel = require('gulp-babel');

// js语法检查模块
var jshint = require('gulp-jshint');

// js压缩模块
var uglify = require('gulp-uglify');

// 文件重命名模块
var rename = require('gulp-rename');

// 添加注释模块
var header = require('gulp-header');

// 时间戳注释
var tempDate = new Date();
var Year = tempDate.getFullYear();
var Month = tempDate.getMonth() + 1;
var day = tempDate.getDate();
var Hours = tempDate.getHours();
var Minute = tempDate.getMinutes();
var Second = tempDate.getSeconds();
var dateString = Year + '-' + Month + '-' + day + ' ' + Hours + ':' + Minute + ':' + Second;

// 编译sass
gulp.task('sass', function () {
  return gulp.src(['src/sass/*.scss','src/sass/*.sass'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dest/css'));
});

// 合并压缩所有css文件
gulp.task('concat', function() {  
  gulp.src(['dest/css/*.css'])
    .pipe(concat('dist.css'))
    .pipe(minifyCss())
    .pipe(rename('dist.min.css'))
    .pipe(header('/** ' + dateString + ' **/\n'))
    .pipe(gulp.dest('dest/public/css'));  
});

// 合并js文件
gulp.task('concatjs', function() {
  return gulp.src(['src/js/*.js'])
    .pipe(jshint())
    .pipe(concat('dist.js'))
    .pipe(gulp.dest('dest/js'));
});

// 合并压缩重命名js文件
gulp.task('jsminify', function (){
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dest/js'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(header('/** ' + dateString + ' **/\n'))
    .pipe(gulp.dest('dest/public/js'));
});

// 合并压缩某个页面的css文件
// gulp.task('detailpage', function() {  
//     gulp.src(['dest/css/demo1.css','dest/css/demo2.css','dest/css/demo3.css'])
//       .pipe(concat('detail.css'))
//       .pipe(minifyCss())
//       .pipe(gulp.dest('public/'));  
// });

// gulp.task('listpage', function() {  
//     gulp.src(['dest/css/list1.css','dest/css/list2.css','dest/css/list3.css'])
//       .pipe(concat('list.css'))
//       .pipe(minifyCss())
//       .pipe(gulp.dest('public/'));  
// });

// 编译jade文件
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  gulp.src(['src/jade/*.jade'])
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('dest/'))
});



// 默认执行watch任务
gulp.task('default', function() {
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('dest/css/*.css', ['concat']);
  gulp.watch('src/js/*.js', ['concatjs']);
  gulp.watch('dest/js/*.js', ['jsminify']);
  gulp.watch('src/jade/*.jade',['jade']);
})