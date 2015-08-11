import gulp from 'gulp'
import concat_css from 'gulp-concat-css'
import del from 'del'

gulp.task("build_css",()=>{
  return gulp.src("./build/client.css")
    .pipe(gulp.dest("./build"))
    .on('end', () => {
      del(['./build/tmp_modules.css'],()=>{})
    })
})