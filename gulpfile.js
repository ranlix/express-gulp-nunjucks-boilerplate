'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify'); // 用于压缩 JS
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

livereload({ start: true });

gulp.task('sass', function () {
  return gulp.src('src/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 2 versions', 'Android >= 4.0']))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('min', function () {
  return gulp.src('src/javascripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.extname = '.min.js';
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/javascripts'))
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('views/**/*.njk').on('change', (file) => {
    livereload.changed(file.path);
  });
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch('src/javascripts/*.js', ['min']);
});

gulp.task('server', () => {
  nodemon({ script: './bin/www' });
});

gulp.task('default', ['server', 'sass', 'min', 'watch']);