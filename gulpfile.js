//make sure you do this to get browser sync on your local machine:
//npm install -g browser-sync

var gulp = require('gulp'),
    util = require('gulp-util'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync').create(),
    shell = require('gulp-shell'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean-css');

//SASS
gulp.task('sass', function(){
  return gulp.src('sass/main.scss')
    .pipe(sass({ style: 'compressed' }))
    .pipe(gulp.dest('client/styles'))
});

//minify css
gulp.task('minify-css', function() {
  return gulp.src('client/styles/*.css')
    .pipe(clean({compatibility: 'ie8'}))
    .pipe(gulp.dest('client/styles/min'));
});

//sync browser with changes
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

//fire up our server
gulp.task('dev', function () {
  nodemon({
    script: 'server/server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
});

//////DB Tasks//////
gulp.task('init-db', shell.task([
  'initdb db',
  'pg_ctl -D db -l logfile start',
  'createdb dev'
]));

gulp.task('restart', shell.task([
  'pkill postgres',
  'pg_ctl -D db -l logfile start'
]));

gulp.task('clear-db', shell.task([
  'dropdb dev',
  'createdb dev'
]));
//////END DB Tasks//////

//watch files
gulp.task('watch', function() {
  gulp.watch('sass/main.scss', ['sass']);
  gulp.watch('client/styles/*.css', ['minify-css']);
  gulp.watch(['client/app/myApp.js','client/app/**/*.js','client/app/**/*.html','client/app/styles/*.css']).on('change', browserSync.reload);
});

//run our default task
gulp.task('default', ['dev','sass', 'minify-css','watch']);


