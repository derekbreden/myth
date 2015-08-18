import gulp from 'gulp'
import through2 from 'through2'
import concat from 'gulp-concat'
import gutil from 'gulp-util'
import parse_html from './parse_html'

gulp.task("build_html", ()=>{
  
  let class_iterator = 0
  let built_css = ''
  let built_js = ''
  return gulp
    .src([
      "./src/**/*.html",
      "./node_modules/myth/src/client/*.html"
    ])
    .pipe(through2.obj(function(file, enc, callback){
      let this_built = parse_html.bind(this)(file, callback, class_iterator++)
      built_css += this_built.css
      built_js += this_built.js
    }))
    .pipe(concat('client/tmp_modules.js'))
    .pipe(through2.obj(function(file, enc, callback){
      this.push(new gutil.File({
        path: 'client/index.css',
        contents: new Buffer(built_css)
      }))
      this.push(new gutil.File({
        path: 'server/tmp_modules.js',
        contents: new Buffer(built_js)
      }))
      this.push(file)
      callback()
    }))
    .pipe(gulp.dest("./build"))
})