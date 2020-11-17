'use strict';
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  ftp = require('vinyl-ftp'),
  notify = require('gulp-notify'),
  rsync = require('gulp-rsync');
// Скрипты проекта
gulp.task('common-js', function () {
  return gulp.src([
    'app/js/common.js',
  ])
    .pipe(concat('common.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});
gulp.task('scripts', gulp.series(['common-js'], function () {
  return gulp.src([
    'app/libs/jquery_3/dist/jquery.min.js',
    'app/libs/jquery-ui/jquery-ui.min.js',
    'app/libs/selectize/js/standalone/selectize.min.js',
    'app/libs/jQuery-Mask-Plugin-master/dist/jquery.mask.min.js',
    'app/libs/slick/slick.min.js',
    'app/js/common.min.js', // Всегда в конце
  ])
    .pipe(concat('scripts.min.js'))
    //.pipe(uglify()) // Минимизировать весь js (на выбор)
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }));
}));
gulp.task('browser-sync', gulp.series(function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    // tunnel: true,
    // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
  });
}));
gulp.task('sass', gulp.series(function () {
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass().on('error', notify.onError()))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS()) // Опционально, закомментировать при отладке
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }));
}));
gulp.task('watch', gulp.series(['sass', 'scripts', 'browser-sync'], function () {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['scripts']);
  gulp.watch('app/*.html', browserSync.reload);
}));

function imageMin() {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'));
}

function removeDist() {
  return gulp.src([
    'app/*.html',
    'app/.htaccess',
  ]).pipe(gulp.dest('dist'));
}

function sassTask() {
  return gulp.src([
    'app/css/main.min.css',
  ]).pipe(gulp.dest('dist/css'));
}

function scripts() {
  return gulp.src([
    'app/js/scripts.min.js',
  ]).pipe(gulp.dest('dist/js'));
}

function fonts() {
  return gulp.src([
    'app/fonts/**/*',
  ]).pipe(gulp.dest('dist/fonts'));
}

gulp.task('build', gulp.series(removeDist, gulp.parallel(scripts, fonts, imageMin, sassTask)));
gulp.task('deploy', gulp.series(function () {
  var conn = ftp.create({
    host: 'alarm-auto.com',
    user: 'alarmaut',
    password: 'km57LvAz22',
    parallel: 10,
    log: gutil.log
  });
  var globs = [
    'dist/**',
    'dist/.htaccess',
  ];
  return gulp.src(globs, { buffer: false })
    .pipe(conn.dest('/public_html/alarm-auto'));
}));
gulp.task('rsync', gulp.series(function () {
  return gulp.src('dist/**')
    .pipe(rsync({
      root: 'dist/',
      hostname: 'alarm-auto.com',
      destination: '/public_html/alarm-auto',
      archive: true,
      silent: false,
      compress: true
    }));
}));
gulp.task('removedist', gulp.series(function () {
  return del.sync('dist');
}));
gulp.task('clearcache', gulp.series(function () {
  return cache.clearAll();
}));
gulp.task('default', gulp.series(['watch']));
