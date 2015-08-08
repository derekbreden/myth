import gulp from 'gulp'
import concat_css from 'gulp-concat-css'
import del from 'del'

gulp.task("build_css",()=>{
  return gulp.src("./node_modules/myth/src/client/index.css")
    .pipe(concat_css("client/index.css"))
    .on('error',()=>{
      console.error(arguments)
    })
    .pipe(gulp.dest("./build"))
    .on('end', () => {
      del(['./build/tmp_modules.css'],()=>{})
    })
})