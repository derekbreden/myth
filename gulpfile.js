
var gulp = require('gulp')
var babel = require('gulp-babel')
var del = require('del')
var run_sequence = require('run-sequence')
var fs = require('fs')

gulp.task("clean", function(cb){
  return del(['./build'], cb)
})

gulp.task("build", ["clean"], function(){
  return gulp.src(["./src/gulpfile/**/*.js"])
    .pipe(babel())
    .on('error', function(err){
      console.error(err.fileName)
      console.error(err.loc)
      console.error(err.codeFrame)
    })
    .pipe(gulp.dest("./build/gulpfile"))
})

gulp.task("watch", function(){
  return gulp.watch([
    './src/**/*.js',
    './src/**/*.css'
  ], ["build"])
})

gulp.task("default", ["build","watch"])