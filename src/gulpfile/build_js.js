import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import del from 'del'
import source from 'vinyl-source-stream'

gulp.task("build_js",(cb)=>{

  gulp.src([
    "./node_modules/myth/src/client/**/*.js"
  ])
    .pipe(gulp.dest("./build/client/"))
    .on('end',()=>{
      browserify({
        entries: ['./build/client/index.js']
      })
      .transform(babelify)
      .bundle()
      .on('error', (err)=>{
        console.warn(err.toString())
        if(err.filename){
          console.error(err.filename)
          console.error(err.loc)
          console.error(err.codeFrame)
        }
      })
      .pipe(source('client/index.js'))
      .pipe(gulp.dest("./build"))
      .on('end', () => {
        del([
          "./build/client/**/*.js",
          "!./build/client/index.js"
        ],()=>{})
        if(cb)cb()
      })
    })
})
